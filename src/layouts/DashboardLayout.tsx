import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLocal } from "@/contexts/LocalContext";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const { currentLocal } = useLocal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="dark min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dark">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                {currentLocal && (
                  <span className="text-sm font-medium text-foreground">
                    {currentLocal.nombre}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {user.email}
                </span>
                <Button variant="ghost" size="icon" onClick={signOut} title="Cerrar sesión">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </header>
            <main className="flex-1 bg-background p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
