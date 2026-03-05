import { useLocal } from "@/contexts/LocalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid } from "lucide-react";

const mockMesas = [
  { numero: 1, zona: "Principal", estado: "libre", capacidad: 4 },
  { numero: 2, zona: "Principal", estado: "ocupada", capacidad: 4 },
  { numero: 3, zona: "Principal", estado: "por_cobrar", capacidad: 2 },
  { numero: 4, zona: "Principal", estado: "libre", capacidad: 6 },
  { numero: 5, zona: "Terraza", estado: "ocupada", capacidad: 4 },
  { numero: 6, zona: "Terraza", estado: "libre", capacidad: 2 },
  { numero: 7, zona: "Terraza", estado: "libre", capacidad: 4 },
  { numero: 8, zona: "VIP", estado: "reservada", capacidad: 8 },
];

const estadoColors: Record<string, string> = {
  libre: "bg-success/20 text-success border-success/30",
  ocupada: "bg-destructive/20 text-destructive border-destructive/30",
  por_cobrar: "bg-warning/20 text-warning border-warning/30",
  reservada: "bg-info/20 text-info border-info/30",
};

const estadoLabels: Record<string, string> = {
  libre: "Libre",
  ocupada: "Ocupada",
  por_cobrar: "Por cobrar",
  reservada: "Reservada",
};

export default function Salon() {
  const { currentLocal } = useLocal();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Salón</h1>
          <p className="text-sm text-muted-foreground">Gestión de mesas y pedidos</p>
        </div>
        <div className="flex gap-3">
          {Object.entries(estadoLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <div className={`h-3 w-3 rounded-full ${estadoColors[key].split(" ")[0]}`} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockMesas.map((mesa) => (
          <Card
            key={mesa.numero}
            className={`cursor-pointer transition-all hover:scale-105 border-2 ${estadoColors[mesa.estado]} bg-card`}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <LayoutGrid className="h-8 w-8 mb-2 opacity-60" />
              <span className="font-display text-xl font-bold">Mesa {mesa.numero}</span>
              <span className="text-xs mt-1 opacity-70">{mesa.zona}</span>
              <Badge variant="outline" className="mt-2 text-xs">
                {estadoLabels[mesa.estado]}
              </Badge>
              <span className="text-xs mt-1 opacity-50">{mesa.capacidad} personas</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
