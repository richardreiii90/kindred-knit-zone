import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, CheckCircle2 } from "lucide-react";

const mockPedidos = [
  {
    id: "1", mesa: "Mesa 2", tipo: "salon", hora: "14:30", estado: "pendiente",
    items: [{ nombre: "Hamburguesa Clásica", cantidad: 2 }, { nombre: "Papas Fritas", cantidad: 1 }],
  },
  {
    id: "2", mesa: "Mostrador", tipo: "mostrador", hora: "14:35", estado: "en_preparacion",
    items: [{ nombre: "Pizza Mozzarella", cantidad: 1 }, { nombre: "Coca-Cola", cantidad: 2 }],
  },
  {
    id: "3", mesa: "Mesa 5", tipo: "salon", hora: "14:40", estado: "pendiente",
    items: [{ nombre: "Milanesa Napolitana", cantidad: 1 }, { nombre: "Ensalada César", cantidad: 1 }],
  },
  {
    id: "4", mesa: "Delivery", tipo: "delivery", hora: "14:25", estado: "listo",
    items: [{ nombre: "Pizza Mozzarella", cantidad: 2 }],
  },
];

const estadoConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", color: "bg-warning/20 text-warning", icon: Clock },
  en_preparacion: { label: "Preparando", color: "bg-info/20 text-info", icon: ChefHat },
  listo: { label: "Listo", color: "bg-success/20 text-success", icon: CheckCircle2 },
};

export default function Cocina() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Cocina</h1>
        <p className="text-sm text-muted-foreground">Pedidos entrantes y en preparación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPedidos.map((pedido) => {
          const config = estadoConfig[pedido.estado];
          const Icon = config.icon;
          return (
            <Card key={pedido.id} className="bg-card border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-foreground">{pedido.mesa}</span>
                    <Badge variant="outline" className="text-xs">
                      {pedido.tipo}
                    </Badge>
                  </div>
                  <Badge className={`${config.color} border-0`}>
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {pedido.hora}
                </div>

                <div className="space-y-1 border-t border-border pt-2">
                  {pedido.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.nombre}</span>
                      <span className="text-muted-foreground font-mono">x{item.cantidad}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {pedido.estado === "pendiente" && (
                    <Button size="sm" className="w-full gap-1">
                      <ChefHat className="h-4 w-4" /> Preparar
                    </Button>
                  )}
                  {pedido.estado === "en_preparacion" && (
                    <Button size="sm" className="w-full gap-1 bg-success hover:bg-success/90">
                      <CheckCircle2 className="h-4 w-4" /> Listo
                    </Button>
                  )}
                  {pedido.estado === "listo" && (
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      Entregado ✓
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
