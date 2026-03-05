import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface Local {
  id: string;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  moneda: string;
  impuesto_porcentaje: number;
}

interface LocalContextType {
  locales: Local[];
  currentLocal: Local | null;
  setCurrentLocal: (local: Local) => void;
  loading: boolean;
}

const LocalContext = createContext<LocalContextType>({
  locales: [],
  currentLocal: null,
  setCurrentLocal: () => {},
  loading: true,
});

export const useLocal = () => useContext(LocalContext);

export function LocalProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [locales, setLocales] = useState<Local[]>([]);
  const [currentLocal, setCurrentLocal] = useState<Local | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLocales([]);
      setCurrentLocal(null);
      setLoading(false);
      return;
    }

    const fetchLocales = async () => {
      const { data } = await supabase
        .from("locales")
        .select("id, nombre, direccion, telefono, moneda, impuesto_porcentaje")
        .eq("owner_id", user.id);

      if (data && data.length > 0) {
        setLocales(data);
        setCurrentLocal(data[0]);
      }
      setLoading(false);
    };

    fetchLocales();
  }, [user]);

  return (
    <LocalContext.Provider value={{ locales, currentLocal, setCurrentLocal, loading }}>
      {children}
    </LocalContext.Provider>
  );
}
