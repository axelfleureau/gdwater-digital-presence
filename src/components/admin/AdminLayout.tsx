
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica autenticazione locale
        const isLocalAuth = localStorage.getItem('gdwater_admin_auth') === 'true';
        const localUser = localStorage.getItem('gdwater_admin_user');
        
        if (isLocalAuth && localUser) {
          const userData = JSON.parse(localUser);
          setAdminName(userData.username || userData.email);
          setLoading(false);
          return;
        }
        
        // Ottieni la sessione corrente
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Controlla ancora una volta l'auth locale in caso sia cambiata
          if (localStorage.getItem('gdwater_admin_auth') === 'true') {
            const localUserRetry = localStorage.getItem('gdwater_admin_user');
            if (localUserRetry) {
              const userData = JSON.parse(localUserRetry);
              setAdminName(userData.username || userData.email);
              setLoading(false);
              return;
            }
          }
          
          navigate("/admin");
          return;
        }

        // Verifica se l'utente è un admin attivo
        const { data, error } = await supabase
          .from("admin_utenti")
          .select("username, attivo")
          .eq("email", session.user.email)
          .single();

        if (error || !data || !data.attivo) {
          // Non è un admin attivo, effettua il logout
          await supabase.auth.signOut();
          navigate("/admin");
          toast.error("Non hai i permessi per accedere all'area amministrativa.");
          return;
        }

        setAdminName(data.username || session.user.email);
        setLoading(false);
      } catch (error) {
        console.error("Errore durante la verifica dell'autenticazione:", error);
        // Fallback all'auth locale in caso di errori
        const isLocalAuth = localStorage.getItem('gdwater_admin_auth') === 'true';
        const localUser = localStorage.getItem('gdwater_admin_user');
        
        if (isLocalAuth && localUser) {
          const userData = JSON.parse(localUser);
          setAdminName(userData.username || userData.email);
          setLoading(false);
        } else {
          navigate("/admin");
        }
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        // Controlla se c'è ancora auth locale prima di reindirizzare
        if (localStorage.getItem('gdwater_admin_auth') !== 'true') {
          navigate("/admin");
        }
      }
    });

    checkAuth();
    
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      // Rimuovi anche l'autenticazione locale
      localStorage.removeItem('gdwater_admin_auth');
      localStorage.removeItem('gdwater_admin_user');
      toast.success("Logout effettuato con successo");
      navigate("/admin");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      toast.error("Si è verificato un errore durante il logout.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gdwater-gray">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-gdwater-blue animate-spin mx-auto mb-4" />
          <p className="text-gdwater-darkgray">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gdwater-gray flex flex-col">
      {/* Header */}
      <header className="bg-gdwater-darkblue text-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">GD Water - Area Amministrativa</h1>
            <p className="text-sm opacity-80">Benvenuto, {adminName}</p>
          </div>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-gdwater-blue"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gdwater-darkblue text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GD Water - Pannello Amministrativo</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
