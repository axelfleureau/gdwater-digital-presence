
import { Mail, Phone, MapPin, Shield, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gdwater-darkblue text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="https://www.gdwater.it/" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/d7146e41-4119-428f-af6d-fd42ee9ff09a.png" 
                alt="GD Water Logo" 
                className="h-10 mr-2"
              />
            </a>
            <p className="text-gray-300">
              Soluzioni professionali per l'erogazione dell'acqua in ambienti aziendali.
              Qualità, sostenibilità e innovazione Made in Italy.
            </p>
            <p className="text-gray-300 text-sm mt-4">
              P.IVA 01924930309<br />
              REA UD-207738<br />
              Cap. Soc. € 100.000 i.v.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Prodotti</h3>
            <ul className="space-y-2">
              <li><a href="https://www.gdwater.it/prodotti/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Dispenser a colonna</a></li>
              <li><a href="https://www.gdwater.it/prodotti/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Dispenser da banco</a></li>
              <li><a href="https://www.gdwater.it/prodotti/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Dispenser industriali</a></li>
              <li><a href="https://www.gdwater.it/prodotti/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sistemi di filtrazione</a></li>
              <li><a href="https://www.gdwater.it/prodotti/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Accessori</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Link utili</h3>
            <ul className="space-y-2">
              <li><a href="#soluzioni" className="text-gray-300 hover:text-white transition-colors">Le nostre soluzioni</a></li>
              <li><a href="#tecnologia" className="text-gray-300 hover:text-white transition-colors">La nostra tecnologia</a></li>
              <li><a href="#vantaggi" className="text-gray-300 hover:text-white transition-colors">Vantaggi</a></li>
              <li><a href="#prodotti" className="text-gray-300 hover:text-white transition-colors">Prodotti</a></li>
              <li><a href="#contatti" className="text-gray-300 hover:text-white transition-colors">Contattaci</a></li>
              <li className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-gdwater-lightblue" />
                <a href="https://www.gdwater.it/privacy-policy/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </li>
              <li className="flex items-center">
                <Cookie className="h-4 w-4 mr-2 text-gdwater-lightblue" />
                <a href="https://www.gdwater.it/cookie-policy/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hai bisogno di assistenza?</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gdwater-lightblue" />
                <a href="tel:+390431938144" className="hover:text-gdwater-lightblue transition-colors">0431 1938144</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gdwater-lightblue" />
                <a href="mailto:commerciale@gdwater.it" className="hover:text-gdwater-lightblue transition-colors">commerciale@gdwater.it</a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gdwater-lightblue mt-1" />
                <span>Via del Lavoro 8<br />33048 San Giovanni Al Natisone<br />Udine, Italia</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a href="#contatti">
                <Button className="bg-white text-gdwater-darkblue hover:bg-gray-200">
                  Contattaci ora
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} GD Water. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
