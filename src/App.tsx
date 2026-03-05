import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocalProvider } from "@/contexts/LocalContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Salon from "./pages/dashboard/Salon";
import Mostrador from "./pages/dashboard/Mostrador";
import Cocina from "./pages/dashboard/Cocina";
import Productos from "./pages/dashboard/Productos";
import Delivery from "./pages/dashboard/Delivery";
import Reportes from "./pages/dashboard/Reportes";
import Configuracion from "./pages/dashboard/Configuracion";
import Arqueo from "./pages/dashboard/Arqueo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LocalProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard/salon" replace />} />
                <Route path="salon" element={<Salon />} />
                <Route path="mostrador" element={<Mostrador />} />
                <Route path="cocina" element={<Cocina />} />
                <Route path="productos" element={<Productos />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="configuracion" element={<Configuracion />} />
                <Route path="arqueo" element={<Arqueo />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LocalProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
