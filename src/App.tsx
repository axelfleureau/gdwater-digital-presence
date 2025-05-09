
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";

// Inizializzazione di React Query
const queryClient = new QueryClient();

// Funzione per meta tags dinamici
const updateMetaTags = () => {
  // Title
  document.title = "GD Water - Soluzioni professionali per l'erogazione dell'acqua";
  
  // Description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", "GD Water fornisce dispenser e soluzioni d'acqua B2B per aziende, con focus su sostenibilità, comodità, assistenza dedicata e Made in Italy.");
  }
  
  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  if (ogTitle) ogTitle.setAttribute("content", "GD Water - Soluzioni per l'erogazione dell'acqua in azienda");
  if (ogDescription) ogDescription.setAttribute("content", "Dispenser professionali Made in Italy per ambienti di lavoro");
  if (ogImage) ogImage.setAttribute("content", `${window.location.origin}/lovable-uploads/2efd93ba-12c9-4654-9f34-42831962ba86.png`);
  if (ogUrl) ogUrl.setAttribute("content", window.location.href);
};

const App = () => {
  const [authInitialized, setAuthInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Aggiorna i meta tag all'avvio dell'applicazione
    updateMetaTags();

    // Configura il listener per l'autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setAuthInitialized(true);
    });

    // Controlla lo stato di autenticazione iniziale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setAuthInitialized(true);
    });

    // Pulizia alla smontaggio
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Elemento di rotta protetta che verifica l'autenticazione
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!authInitialized) {
      return <div className="min-h-screen flex items-center justify-center bg-gdwater-gray">
        <div className="text-center">
          <div className="spinner h-10 w-10 border-4 border-gdwater-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gdwater-darkgray">Caricamento...</p>
        </div>
      </div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            } />
            {/* Rotta catch-all per 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
