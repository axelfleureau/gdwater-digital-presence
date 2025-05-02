
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gdwater-darkblue text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GD Water</h3>
            <p className="text-gray-300">
              Soluzioni professionali per l'erogazione dell'acqua in ambienti aziendali.
              Qualità, sostenibilità e innovazione Made in Italy.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Prodotti</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dispenser a colonna</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dispenser da banco</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dispenser industriali</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sistemi di filtrazione</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accessori</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Link utili</h3>
            <ul className="space-y-2">
              <li><a href="#soluzioni" className="text-gray-300 hover:text-white transition-colors">Le nostre soluzioni</a></li>
              <li><a href="#vantaggi" className="text-gray-300 hover:text-white transition-colors">Vantaggi</a></li>
              <li><a href="#prodotti" className="text-gray-300 hover:text-white transition-colors">Prodotti</a></li>
              <li><a href="#contatti" className="text-gray-300 hover:text-white transition-colors">Contattaci</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hai bisogno di assistenza?</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gdwater-lightblue" />
                <span>+39 0123 456789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gdwater-lightblue" />
                <span>info@gdwater.it</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gdwater-lightblue mt-1" />
                <span>Via dell'Acqua, 123<br />20100 Milano (MI)<br />Italia</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="bg-white text-gdwater-darkblue hover:bg-gray-200">
                Contattaci ora
              </Button>
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
