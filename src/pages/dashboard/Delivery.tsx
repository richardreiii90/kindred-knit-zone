import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Phone, MapPin, Clock } from "lucide-react";

const mockDeliveries = [
  { id: "1", cliente: "Carlos López", telefono: "11-2345-6789", direccion: "Av. Corrientes 1234", estado: "pendiente", total: 5200, hora: "15:00" },
  { id: "2", cliente: "María García", telefono: "11-9876-5432", direccion: "Calle Florida 567", estado: "en_camino", total: 3800, hora: "14:45" },
  { id: "3", cliente: "Pedro Martínez", telefono: "11-5555-1234", direccion: "San Martín 890", estado: "entregado", total: 8400, hora: "14:20" },
];

const estadoColors: Record<string, string> = {
  pendiente: "bg-warning/20 text-warning",
  en_camino: "bg-info/20 text-info",
  entregado: "bg-success/20 text-success",
};

const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  en_camino: "En camino",
  entregado: "Entregado",
};

export default function Delivery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Delivery</h1>
          <p className="text-sm text-muted-foreground">Gestión de pedidos a domicilio</p>
        </div>
        <Button className="gap-2">
          <Truck className="h-4 w-4" /> Nuevo pedido
        </Button>
      </div>

      <Card className="bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-muted-foreground">Dirección</TableHead>
              <TableHead className="text-muted-foreground">Hora</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeliveries.map((d) => (
              <TableRow key={d.id} className="border-border">
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{d.cliente}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {d.telefono}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" /> {d.direccion}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{d.hora}</span>
                </TableCell>
                <TableCell className="text-primary font-mono font-bold">
                  ${d.total.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={`${estadoColors[d.estado]} border-0`}>
                    {estadoLabels[d.estado]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
