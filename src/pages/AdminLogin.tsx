
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();

  // Verifica se l'utente è già autenticato all'avvio
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Verifica autenticazione locale
        const isLocalAuth = localStorage.getItem('gdwater_admin_auth') === 'true';
        if (isLocalAuth) {
          navigate("/admin/dashboard");
          return;
        }

        // Verifica autenticazione Supabase
        const { data } = await supabase.auth.getSession();
        console.log("Sessione Supabase:", data.session);

        if (data.session) {
          // Verifica se l'utente è un admin attivo
          const { data: adminData, error: adminError } = await supabase
            .from("admin_utenti")
            .select("attivo")
            .eq("email", data.session.user.email)
            .single();

          console.log("Dati admin:", adminData, "Errore:", adminError);

          if (!adminError && adminData && adminData.attivo) {
            // Utente già autenticato e attivo, reindirizza alla dashboard
            navigate("/admin/dashboard");
            return;
          } else {
            console.log("Utente non attivo o non admin");
            // Logout se non è un admin attivo
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("Errore durante il controllo della sessione:", error);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Tentativo di login con:", email);
      
      // 1. Prima autentichiamo l'utente con Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Risultato autenticazione:", data, "Errore:", error);

      if (error) {
        console.error("Errore di autenticazione:", error);
        toast.error("Credenziali non valide o utente non autorizzato.");
        return;
      }

      if (data.user) {
        // 2. Ora verifichiamo se l'utente è un admin attivo
        const { data: adminUser, error: adminError } = await supabase
          .from("admin_utenti")
          .select("attivo")
          .eq("email", email)
          .single();

        console.log("Verifica admin:", adminUser, "Errore:", adminError);

        if (adminError || !adminUser || !adminUser.attivo) {
          // Se non è un admin attivo, effettuiamo il logout
          await supabase.auth.signOut();
          toast.error("Non hai i permessi per accedere all'area amministrativa.");
          return;
        }

        toast.success("Accesso effettuato con successo!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      toast.error("Si è verificato un errore durante l'accesso.");
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per il bypass dell'autenticazione (modalità debug)
  const handleDebugLogin = async () => {
    setIsLoading(true);
    try {
      // Bypass completo dell'autenticazione Supabase
      // Impostiamo direttamente un flag nel localStorage
      localStorage.setItem('gdwater_admin_auth', 'true');
      localStorage.setItem('gdwater_admin_user', JSON.stringify({
        email: 'admin@gdwater.it',
        username: 'Admin Debug'
      }));
      
      toast.success("Accesso in modalità debug effettuato!");
      
      // Reindirizzamento alla dashboard dopo il toast
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (error) {
      console.error("Errore durante l'accesso debug:", error);
      toast.error("Si è verificato un errore durante l'accesso debug.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Mostra un loader durante il controllo della sessione
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gdwater-gray flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <Loader2 className="h-8 w-8 text-gdwater-blue animate-spin" />
        <p className="mt-4 text-gdwater-darkgray">Verifica sessione in corso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gdwater-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src="/lovable-uploads/089a1f06-09c7-468e-b631-f5c03ea80549.png"
            alt="GD Water Logo"
            className="h-16 mb-6"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gdwater-darkblue">
          Area Amministrativa
        </h2>
        <p className="mt-2 text-center text-sm text-gdwater-darkgray">
          Accedi per gestire i contatti GD Water
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5" aria-label="Nascondi password" /> : 
                    <Eye className="h-5 w-5" aria-label="Mostra password" />
                  }
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                type="submit"
                className="w-full bg-gdwater-blue hover:bg-gdwater-darkblue text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accesso in corso...
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
              
              {/* Pulsante per accesso debug senza credenziali */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-gdwater-blue text-gdwater-blue hover:bg-gdwater-blue/10"
                onClick={handleDebugLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Elaborazione...
                  </>
                ) : (
                  "Accedi senza credenziali"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Area riservata
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <a href="/" className="font-medium text-gdwater-blue hover:text-gdwater-darkblue">
                Torna alla home page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
