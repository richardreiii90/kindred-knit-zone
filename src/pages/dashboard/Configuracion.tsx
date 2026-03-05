import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocal } from "@/contexts/LocalContext";
import { Settings, Store, Percent, DollarSign } from "lucide-react";

export default function Configuracion() {
  const { currentLocal } = useLocal();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">Ajustes de tu local</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-foreground">
            <Store className="h-5 w-5 text-primary" />
            Datos del local
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Nombre del local</Label>
            <Input defaultValue={currentLocal?.nombre || ""} className="bg-secondary border-border text-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Dirección</Label>
            <Input defaultValue={currentLocal?.direccion || ""} placeholder="Dirección del local" className="bg-secondary border-border text-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Teléfono</Label>
            <Input defaultValue={currentLocal?.telefono || ""} placeholder="Teléfono" className="bg-secondary border-border text-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> Moneda
              </Label>
              <Input defaultValue={currentLocal?.moneda || "ARS"} className="bg-secondary border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-1">
                <Percent className="h-4 w-4" /> Impuesto (%)
              </Label>
              <Input type="number" defaultValue={currentLocal?.impuesto_porcentaje || 21} className="bg-secondary border-border text-foreground" />
            </div>
          </div>
          <Button className="gap-2">
            <Settings className="h-4 w-4" /> Guardar cambios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
