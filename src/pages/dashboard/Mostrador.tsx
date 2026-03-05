import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingBag, CreditCard, Banknote, Search } from "lucide-react";

const mockProductos = [
  { id: "1", nombre: "Hamburguesa Clásica", precio: 3500, categoria: "Hamburguesas" },
  { id: "2", nombre: "Papas Fritas", precio: 1500, categoria: "Acompañamientos" },
  { id: "3", nombre: "Coca-Cola", precio: 1200, categoria: "Bebidas" },
  { id: "4", nombre: "Pizza Mozzarella", precio: 4200, categoria: "Pizzas" },
  { id: "5", nombre: "Cerveza Artesanal", precio: 2000, categoria: "Bebidas" },
  { id: "6", nombre: "Ensalada César", precio: 2800, categoria: "Ensaladas" },
  { id: "7", nombre: "Milanesa Napolitana", precio: 4500, categoria: "Principales" },
  { id: "8", nombre: "Agua Mineral", precio: 800, categoria: "Bebidas" },
];

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function Mostrador() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (product: typeof mockProductos[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, cantidad: Math.max(0, i.cantidad + delta) } : i).filter((i) => i.cantidad > 0));
  };

  const total = cart.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const filtered = mockProductos.filter((p) => p.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Products */}
      <div className="flex-1 space-y-4 overflow-auto">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Mostrador</h1>
          <p className="text-sm text-muted-foreground">Venta rápida sin mesa</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((p) => (
            <Card
              key={p.id}
              className="cursor-pointer hover:border-primary/50 transition-colors bg-card border-border"
              onClick={() => addToCart(p)}
            >
              <CardContent className="p-4">
                <h3 className="font-medium text-sm text-foreground">{p.nombre}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.categoria}</p>
                <p className="text-primary font-bold mt-2">${p.precio.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart */}
      <Card className="w-80 flex flex-col bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground font-display">
            <ShoppingBag className="h-5 w-5" />
            Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-2">
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Sin productos</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.nombre}</p>
                  <p className="text-xs text-muted-foreground">${item.precio.toLocaleString()} c/u</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, -1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm text-foreground">{item.cantidad}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">${total.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button className="gap-1" disabled={cart.length === 0}>
              <Banknote className="h-4 w-4" /> Efectivo
            </Button>
            <Button variant="outline" className="gap-1" disabled={cart.length === 0}>
              <CreditCard className="h-4 w-4" /> Tarjeta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
