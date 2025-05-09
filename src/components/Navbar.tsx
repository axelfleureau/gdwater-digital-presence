
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  return <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/">
            <img src="/lovable-uploads/d7146e41-4119-428f-af6d-fd42ee9ff09a.png" alt="GD Water Logo" className="h-10 md:h-12" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gdwater-darkblue">
          <a href="#soluzioni" className="hover:text-gdwater-blue transition-colors py-2">Soluzioni</a>
          <a href="#vantaggi" className="hover:text-gdwater-blue transition-colors py-2">Vantaggi</a>
          <a href="#prodotti" className="hover:text-gdwater-blue transition-colors py-2">Prodotti</a>
          <a href="#contatti" className="hover:text-gdwater-blue transition-colors py-2">Contattaci</a>
        </nav>
        
        {/* Desktop CTA Button and Admin Link */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="#contatti">
            <Button variant="default" className="bg-gdwater-blue hover:bg-gdwater-darkblue">
              Chiedi Informazioni
            </Button>
          </a>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/admin" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors p-2">
                  <UserRound size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Area riservata</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/admin" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors p-2 mr-2">
            <UserRound size={20} />
          </Link>
          <button className="text-gdwater-blue p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-6 text-xl">
              <a href="#soluzioni" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Soluzioni
              </a>
              <a href="#tecnologia" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Tecnologia
              </a>
              <a href="#vantaggi" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Vantaggi
              </a>
              <a href="#prodotti" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Prodotti
              </a>
              <a href="#contatti" className="text-gdwater-darkblue hover:text-gdwater-blue transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Contattaci
              </a>
              <div className="mt-6">
                <Button variant="default" className="bg-gdwater-blue hover:bg-gdwater-darkblue text-white px-6 py-2" onClick={() => {
                  document.getElementById('contatti')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                  setIsMobileMenuOpen(false);
                }}>
                  Chiedi Informazioni
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};

export default Navbar;
