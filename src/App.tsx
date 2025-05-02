
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
  useEffect(() => {
    // Aggiorna i meta tag all'avvio dell'applicazione
    updateMetaTags();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
