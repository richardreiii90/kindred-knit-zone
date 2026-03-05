
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create locales table
CREATE TABLE public.locales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  logo_url TEXT,
  moneda TEXT NOT NULL DEFAULT 'ARS',
  impuesto_porcentaje NUMERIC(5,2) NOT NULL DEFAULT 21.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.locales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own locales" ON public.locales FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert locales" ON public.locales FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own locales" ON public.locales FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete own locales" ON public.locales FOR DELETE USING (auth.uid() = owner_id);

-- Security definer function to check local ownership
CREATE OR REPLACE FUNCTION public.owns_local(_local_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.locales WHERE id = _local_id AND owner_id = auth.uid()
  )
$$;

-- Create categorias table
CREATE TABLE public.categorias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_id UUID NOT NULL REFERENCES public.locales(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  orden INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view categorias" ON public.categorias FOR SELECT USING (public.owns_local(local_id));
CREATE POLICY "Owners can insert categorias" ON public.categorias FOR INSERT WITH CHECK (public.owns_local(local_id));
CREATE POLICY "Owners can update categorias" ON public.categorias FOR UPDATE USING (public.owns_local(local_id));
CREATE POLICY "Owners can delete categorias" ON public.categorias FOR DELETE USING (public.owns_local(local_id));

-- Create productos table
CREATE TABLE public.productos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_id UUID NOT NULL REFERENCES public.locales(id) ON DELETE CASCADE,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL DEFAULT 0,
  imagen_url TEXT,
  activo BOOLEAN NOT NULL DEFAULT true,
  stock INT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view productos" ON public.productos FOR SELECT USING (public.owns_local(local_id));
CREATE POLICY "Owners can insert productos" ON public.productos FOR INSERT WITH CHECK (public.owns_local(local_id));
CREATE POLICY "Owners can update productos" ON public.productos FOR UPDATE USING (public.owns_local(local_id));
CREATE POLICY "Owners can delete productos" ON public.productos FOR DELETE USING (public.owns_local(local_id));

-- Create mesas table
CREATE TABLE public.mesas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_id UUID NOT NULL REFERENCES public.locales(id) ON DELETE CASCADE,
  numero INT NOT NULL,
  zona TEXT NOT NULL DEFAULT 'Principal',
  estado TEXT NOT NULL DEFAULT 'libre' CHECK (estado IN ('libre', 'ocupada', 'por_cobrar', 'reservada')),
  capacidad INT NOT NULL DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.mesas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view mesas" ON public.mesas FOR SELECT USING (public.owns_local(local_id));
CREATE POLICY "Owners can insert mesas" ON public.mesas FOR INSERT WITH CHECK (public.owns_local(local_id));
CREATE POLICY "Owners can update mesas" ON public.mesas FOR UPDATE USING (public.owns_local(local_id));
CREATE POLICY "Owners can delete mesas" ON public.mesas FOR DELETE USING (public.owns_local(local_id));

-- Create pedidos table
CREATE TABLE public.pedidos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_id UUID NOT NULL REFERENCES public.locales(id) ON DELETE CASCADE,
  mesa_id UUID REFERENCES public.mesas(id) ON DELETE SET NULL,
  tipo TEXT NOT NULL DEFAULT 'mostrador' CHECK (tipo IN ('salon', 'mostrador', 'delivery')),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_preparacion', 'listo', 'entregado', 'cancelado', 'pagado')),
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  impuesto NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  metodo_pago TEXT CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia', 'otro')),
  cliente_nombre TEXT,
  cliente_telefono TEXT,
  cliente_direccion TEXT,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view pedidos" ON public.pedidos FOR SELECT USING (public.owns_local(local_id));
CREATE POLICY "Owners can insert pedidos" ON public.pedidos FOR INSERT WITH CHECK (public.owns_local(local_id));
CREATE POLICY "Owners can update pedidos" ON public.pedidos FOR UPDATE USING (public.owns_local(local_id));
CREATE POLICY "Owners can delete pedidos" ON public.pedidos FOR DELETE USING (public.owns_local(local_id));

-- Create pedido_items table
CREATE TABLE public.pedido_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES public.productos(id) ON DELETE SET NULL,
  nombre_producto TEXT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pedido_items ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.owns_pedido(_pedido_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.pedidos p
    JOIN public.locales l ON l.id = p.local_id
    WHERE p.id = _pedido_id AND l.owner_id = auth.uid()
  )
$$;

CREATE POLICY "Owners can view pedido_items" ON public.pedido_items FOR SELECT USING (public.owns_pedido(pedido_id));
CREATE POLICY "Owners can insert pedido_items" ON public.pedido_items FOR INSERT WITH CHECK (public.owns_pedido(pedido_id));
CREATE POLICY "Owners can update pedido_items" ON public.pedido_items FOR UPDATE USING (public.owns_pedido(pedido_id));
CREATE POLICY "Owners can delete pedido_items" ON public.pedido_items FOR DELETE USING (public.owns_pedido(pedido_id));

-- Create arqueos_caja table
CREATE TABLE public.arqueos_caja (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  local_id UUID NOT NULL REFERENCES public.locales(id) ON DELETE CASCADE,
  fecha_apertura TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  fecha_cierre TIMESTAMP WITH TIME ZONE,
  monto_inicial NUMERIC(10,2) NOT NULL DEFAULT 0,
  monto_final NUMERIC(10,2),
  total_ventas NUMERIC(10,2) DEFAULT 0,
  total_efectivo NUMERIC(10,2) DEFAULT 0,
  total_tarjeta NUMERIC(10,2) DEFAULT 0,
  total_transferencia NUMERIC(10,2) DEFAULT 0,
  diferencia NUMERIC(10,2),
  estado TEXT NOT NULL DEFAULT 'abierto' CHECK (estado IN ('abierto', 'cerrado')),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.arqueos_caja ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view arqueos" ON public.arqueos_caja FOR SELECT USING (public.owns_local(local_id));
CREATE POLICY "Owners can insert arqueos" ON public.arqueos_caja FOR INSERT WITH CHECK (public.owns_local(local_id));
CREATE POLICY "Owners can update arqueos" ON public.arqueos_caja FOR UPDATE USING (public.owns_local(local_id));

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_locales_updated_at BEFORE UPDATE ON public.locales FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON public.pedidos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile and local on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nombre, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nombre', 'Usuario'), NEW.email);
  
  INSERT INTO public.locales (owner_id, nombre)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nombre_local', 'Mi Local'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
