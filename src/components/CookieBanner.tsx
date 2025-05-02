
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("gdwater-cookies-accepted");
    
    // If not, show the banner after a short delay
    if (!cookiesAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("gdwater-cookies-accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full animate-fade-in-up">
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <Cookie className="w-6 h-6 text-gdwater-blue flex-shrink-0 mt-1" />
            <h3 className="text-lg font-semibold text-gdwater-darkblue">Informativa sui Cookie</h3>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">
            Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Navigando su questo sito, accetti la nostra politica sui cookie.
          </p>
          
          <div className="mb-4">
            <a 
              href="https://www.gdwater.it/privacy-policy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gdwater-blue hover:underline"
            >
              Leggi le nostre policy
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button 
              variant="outline" 
              className="text-sm border-gdwater-blue text-gdwater-blue hover:bg-gdwater-blue hover:text-white order-2 sm:order-1"
              onClick={acceptCookies}
            >
              Solo essenziali
            </Button>
            <Button 
              className="text-sm bg-gdwater-blue text-white hover:bg-gdwater-darkblue order-1 sm:order-2"
              onClick={acceptCookies}
            >
              Accetta tutti
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
