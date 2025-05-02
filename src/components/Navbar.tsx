
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center">
          <a href="https://www.gdwater.it/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/d7146e41-4119-428f-af6d-fd42ee9ff09a.png" 
              alt="GD Water Logo" 
              className="h-10 md:h-12"
            />
          </a>
        </div>
        <nav className={`${isMobileMenuOpen ? 'fixed inset-0 bg-white flex flex-col items-center justify-center z-50 md:relative md:inset-auto md:bg-transparent md:flex-row' : 'hidden md:flex'} space-x-8 text-gdwater-darkblue`}>
          <a href="#soluzioni" className="hover:text-gdwater-blue transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Soluzioni</a>
          <a href="#tecnologia" className="hover:text-gdwater-blue transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Tecnologia</a>
          <a href="#vantaggi" className="hover:text-gdwater-blue transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Vantaggi</a>
          <a href="#prodotti" className="hover:text-gdwater-blue transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Prodotti</a>
          <a href="#contatti" className="hover:text-gdwater-blue transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contattaci</a>
          <div className="md:hidden mt-4">
            <Button 
              variant="default" 
              className="bg-gdwater-blue hover:bg-gdwater-darkblue"
              onClick={() => {
                document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              Chiedi Informazioni
            </Button>
          </div>
        </nav>
        <a href="#contatti" className="hidden md:inline-flex">
          <Button variant="default" className="bg-gdwater-blue hover:bg-gdwater-darkblue">
            Chiedi Informazioni
          </Button>
        </a>
        <button 
          className="md:hidden text-gdwater-blue p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
