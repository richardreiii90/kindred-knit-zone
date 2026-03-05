import { useLocation } from "react-router-dom";
import {
  UtensilsCrossed,
  LayoutGrid,
  ShoppingBag,
  ChefHat,
  Package,
  BarChart3,
  Settings,
  Truck,
  Calculator,
  Store,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocal } from "@/contexts/LocalContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const menuItems = [
  { title: "Salón", url: "/dashboard/salon", icon: LayoutGrid },
  { title: "Mostrador", url: "/dashboard/mostrador", icon: ShoppingBag },
  { title: "Cocina", url: "/dashboard/cocina", icon: ChefHat },
  { title: "Productos", url: "/dashboard/productos", icon: Package },
  { title: "Delivery", url: "/dashboard/delivery", icon: Truck },
  { title: "Reportes", url: "/dashboard/reportes", icon: BarChart3 },
  { title: "Arqueo de Caja", url: "/dashboard/arqueo", icon: Calculator },
  { title: "Configuración", url: "/dashboard/configuracion", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { locales, currentLocal, setCurrentLocal } = useLocal();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold text-sidebar-accent-foreground">
              FudoPOS
            </span>
          )}
        </div>
        {!collapsed && locales.length > 0 && (
          <div className="mt-3 px-2">
            <Select
              value={currentLocal?.id}
              onValueChange={(id) => {
                const local = locales.find((l) => l.id === id);
                if (local) setCurrentLocal(local);
              }}
            >
              <SelectTrigger className="h-9 bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground text-sm">
                <Store className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map((local) => (
                  <SelectItem key={local.id} value={local.id}>
                    {local.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
            FudoPOS v1.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
