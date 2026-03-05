import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ventasSemana = [
  { dia: "Lun", ventas: 45000 },
  { dia: "Mar", ventas: 52000 },
  { dia: "Mié", ventas: 38000 },
  { dia: "Jue", ventas: 61000 },
  { dia: "Vie", ventas: 78000 },
  { dia: "Sáb", ventas: 95000 },
  { dia: "Dom", ventas: 72000 },
];

const stats = [
  { title: "Ventas Hoy", value: "$72,000", icon: DollarSign, change: "+12%" },
  { title: "Pedidos Hoy", value: "43", icon: ShoppingBag, change: "+8%" },
  { title: "Ticket Promedio", value: "$1,674", icon: BarChart3, change: "+3%" },
  { title: "Crecimiento", value: "+15%", icon: TrendingUp, change: "vs semana pasada" },
];

export default function Reportes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Reportes</h1>
        <p className="text-sm text-muted-foreground">Análisis de ventas y rendimiento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-success">{stat.change}</span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Ventas de la semana</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="dia" stroke="hsl(220 10% 55%)" />
              <YAxis stroke="hsl(220 10% 55%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 25% 11%)",
                  border: "1px solid hsl(220 15% 18%)",
                  borderRadius: "8px",
                  color: "hsl(210 20% 92%)",
                }}
              />
              <Bar dataKey="ventas" fill="hsl(25 95% 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
