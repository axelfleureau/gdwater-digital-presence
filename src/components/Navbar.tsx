
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
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
          <span className="font-bold text-2xl text-gdwater-blue">GD Water</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-gdwater-darkblue">
          <a href="#soluzioni" className="hover:text-gdwater-blue transition-colors">Soluzioni</a>
          <a href="#vantaggi" className="hover:text-gdwater-blue transition-colors">Vantaggi</a>
          <a href="#prodotti" className="hover:text-gdwater-blue transition-colors">Prodotti</a>
          <a href="#contatti" className="hover:text-gdwater-blue transition-colors">Contattaci</a>
        </nav>
        <Button variant="default" className="hidden md:inline-flex bg-gdwater-blue hover:bg-gdwater-darkblue">
          Chiedi Informazioni
        </Button>
        <button className="md:hidden text-gdwater-blue p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
