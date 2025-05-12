
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Errore di autenticazione:", error);
        toast.error("Credenziali non valide o utente non autorizzato.");
        return;
      }

      if (data.user) {
        // Verifica se l'utente è nell'elenco degli admin
        const { data: adminData, error: adminError } = await supabase
          .from("admin_utenti")
          .select("attivo")
          .eq("email", email)
          .single();

        if (adminError || !adminData || !adminData.attivo) {
          // Se non è un admin attivo, effettua il logout
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
      // Accesso diretto senza verifica credenziali
      toast.success("Accesso in modalità debug effettuato!");
      navigate("/admin/dashboard");
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

  return (
    <div className="min-h-screen bg-gdwater-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </Button>
              
              {/* Pulsante per accesso debug senza credenziali */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-gdwater-blue text-gdwater-blue hover:bg-gdwater-blue/10"
                onClick={handleDebugLogin}
                disabled={isLoading}
              >
                Accedi senza credenziali
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
