import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, DollarSign, CreditCard, Banknote, ArrowRightLeft } from "lucide-react";

const mockArqueos = [
  {
    id: "1", fecha: "2026-03-05", estado: "abierto",
    monto_inicial: 10000, total_ventas: 72000,
    total_efectivo: 45000, total_tarjeta: 22000, total_transferencia: 5000,
  },
  {
    id: "2", fecha: "2026-03-04", estado: "cerrado",
    monto_inicial: 10000, monto_final: 55200, total_ventas: 68000,
    total_efectivo: 42000, total_tarjeta: 20000, total_transferencia: 6000, diferencia: -800,
  },
];

export default function Arqueo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Arqueo de Caja</h1>
          <p className="text-sm text-muted-foreground">Control de apertura y cierre de caja</p>
        </div>
        <Button className="gap-2">
          <Calculator className="h-4 w-4" /> Abrir caja
        </Button>
      </div>

      {/* Current box summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ventas Hoy</p>
              <p className="text-xl font-bold font-display text-foreground">$72,000</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Banknote className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Efectivo</p>
              <p className="text-xl font-bold font-display text-foreground">$45,000</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/20 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tarjeta</p>
              <p className="text-xl font-bold font-display text-foreground">$22,000</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <ArrowRightLeft className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transferencia</p>
              <p className="text-xl font-bold font-display text-foreground">$5,000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Historial de arqueos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Fecha</TableHead>
                <TableHead className="text-muted-foreground">Monto Inicial</TableHead>
                <TableHead className="text-muted-foreground">Ventas</TableHead>
                <TableHead className="text-muted-foreground">Diferencia</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockArqueos.map((a) => (
                <TableRow key={a.id} className="border-border">
                  <TableCell className="text-foreground">{a.fecha}</TableCell>
                  <TableCell className="text-muted-foreground font-mono">${a.monto_inicial.toLocaleString()}</TableCell>
                  <TableCell className="text-primary font-mono font-bold">${a.total_ventas.toLocaleString()}</TableCell>
                  <TableCell className={`font-mono ${a.diferencia && a.diferencia < 0 ? "text-destructive" : "text-success"}`}>
                    {a.diferencia !== undefined ? `$${a.diferencia.toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={a.estado === "abierto" ? "bg-success/20 text-success border-0" : "bg-secondary text-muted-foreground border-0"}>
                      {a.estado === "abierto" ? "Abierto" : "Cerrado"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
