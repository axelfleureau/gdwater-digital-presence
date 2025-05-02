
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
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200 animate-fade-in">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <Cookie className="w-6 h-6 text-gdwater-blue flex-shrink-0 mt-1 md:mt-0" />
            <p className="text-sm text-gray-700">
              Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Navigando su questo sito, accetti la nostra 
              <a 
                href="https://www.gdwater.it/cookie-policy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gdwater-blue hover:underline mx-1"
              >
                Cookie Policy
              </a>
              e la nostra
              <a 
                href="https://www.gdwater.it/privacy-policy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gdwater-blue hover:underline mx-1"
              >
                Privacy Policy
              </a>.
            </p>
          </div>
          <div className="flex gap-3 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              className="text-sm border-gdwater-blue text-gdwater-blue hover:bg-gdwater-blue hover:text-white"
              onClick={acceptCookies}
            >
              Accetta tutti
            </Button>
            <Button 
              className="text-sm bg-gdwater-blue text-white hover:bg-gdwater-darkblue"
              onClick={acceptCookies}
            >
              Solo essenziali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
