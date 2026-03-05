

## Plan: Sistema POS Gastronómico Multi-Local

### 1. Autenticación y Registro
- Página de **registro** para dueños de locales (email + contraseña + nombre del negocio)
- Página de **login**
- Recuperación de contraseña
- Al registrarse, se crea automáticamente el perfil del dueño y su primer local/restaurante

### 2. Base de Datos (Supabase)
- **profiles**: datos del dueño (nombre, email)
- **locales**: nombre del local, dirección, teléfono, logo (vinculado al dueño)
- **categorias**: categorías de productos por local
- **productos**: nombre, precio, categoría, imagen, stock, por local
- **mesas**: número, estado (libre/ocupada), zona, por local
- **pedidos**: mesa/mostrador/delivery, estado, total, fecha
- **pedido_items**: productos del pedido con cantidad y precio
- **arqueos_caja**: apertura/cierre de caja, montos
- **configuracion**: datos del local (impuestos, moneda, impresora)
- Políticas RLS para que cada dueño solo vea datos de sus locales

### 3. Módulos del POS

**Salón** — Vista de mesas con estados (libre, ocupada, por cobrar). Tomar pedidos por mesa.

**Mostrador** — Venta rápida sin mesa. Selección de productos, cobro directo.

**Cocina** — Pantalla con pedidos entrantes, marcar como "en preparación" y "listo".

**Productos** — CRUD de productos y categorías con precios.

**Reportes** — Ventas por día/semana/mes con gráficos (recharts). Productos más vendidos.

**Configuración** — Datos del local, impuestos, zonas de mesas.

**Delivery** — Pedidos para envío con datos del cliente y dirección.

**Arqueo de Caja** — Apertura/cierre de caja, resumen de movimientos.

### 4. Navegación
- Sidebar con todos los módulos e ícono del local
- Selector de local (si el dueño tiene varios en el futuro)
- Header con nombre del usuario y logout

### 5. Diseño
- Estilo profesional oscuro inspirado en el sitio de referencia (fudo2.vercel.app)
- Responsive para tablet y desktop
- Colores principales: fondo oscuro, acentos en naranja/ámbar

