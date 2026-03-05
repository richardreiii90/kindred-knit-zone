import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { useState } from "react";

const mockProductos = [
  { id: "1", nombre: "Hamburguesa Clásica", categoria: "Hamburguesas", precio: 3500, activo: true, stock: null },
  { id: "2", nombre: "Papas Fritas", categoria: "Acompañamientos", precio: 1500, activo: true, stock: 50 },
  { id: "3", nombre: "Coca-Cola", categoria: "Bebidas", precio: 1200, activo: true, stock: 100 },
  { id: "4", nombre: "Pizza Mozzarella", categoria: "Pizzas", precio: 4200, activo: true, stock: null },
  { id: "5", nombre: "Cerveza Artesanal", categoria: "Bebidas", precio: 2000, activo: false, stock: 0 },
  { id: "6", nombre: "Ensalada César", categoria: "Ensaladas", precio: 2800, activo: true, stock: null },
  { id: "7", nombre: "Milanesa Napolitana", categoria: "Principales", precio: 4500, activo: true, stock: null },
];

export default function Productos() {
  const [search, setSearch] = useState("");
  const filtered = mockProductos.filter((p) => p.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground">Gestión de tu catálogo</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo producto
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <Card className="bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Producto</TableHead>
              <TableHead className="text-muted-foreground">Categoría</TableHead>
              <TableHead className="text-muted-foreground">Precio</TableHead>
              <TableHead className="text-muted-foreground">Stock</TableHead>
              <TableHead className="text-muted-foreground">Estado</TableHead>
              <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="border-border">
                <TableCell className="font-medium text-foreground">{p.nombre}</TableCell>
                <TableCell className="text-muted-foreground">{p.categoria}</TableCell>
                <TableCell className="text-primary font-mono">${p.precio.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">
                  {p.stock !== null ? p.stock : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={p.activo ? "default" : "secondary"} className={p.activo ? "bg-success/20 text-success border-0" : ""}>
                    {p.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
