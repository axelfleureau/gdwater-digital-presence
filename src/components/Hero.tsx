
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import DynamicGreeting from "./DynamicGreeting";

const Hero = () => {
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-white to-gdwater-gray pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-left space-y-6 animate-fade-in lg:pr-12">
          <DynamicGreeting />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gdwater-darkblue leading-tight">
            L'acqua perfetta per la tua azienda
          </h1>
          <p className="text-lg md:text-xl text-gdwater-darkgray max-w-xl">
            GD Water fornisce soluzioni professionali per l'erogazione dell'acqua in ambienti aziendali, 
            con dispenser di alta qualità Made in Italy, assistenza dedicata e attenzione alla sostenibilità.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={() => scrollToSection('contatti')}
              className="bg-gdwater-blue hover:bg-gdwater-darkblue text-white px-8 py-6 text-lg"
              data-track="cta_contattaci"
            >
              Contattaci ora
            </Button>
            <Button 
              onClick={() => scrollToSection('soluzioni')}
              variant="outline" 
              className="border-gdwater-blue text-gdwater-blue hover:bg-gdwater-gray flex items-center gap-2 px-8 py-6 text-lg"
              data-track="cta_scopri_soluzioni"
            >
              Scopri le soluzioni <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img 
            src="/lovable-uploads/2efd93ba-12c9-4654-9f34-42831962ba86.png" 
            alt="GD Water - Dispenser professionale" 
            className="max-h-[500px] object-contain rounded-lg shadow-lg animate-scale-in" 
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Button 
          variant="ghost" 
          className="rounded-full p-2"
          onClick={() => scrollToSection('soluzioni')}
          aria-label="Scorri verso il basso"
        >
          <ArrowDown className="h-6 w-6 text-gdwater-blue" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
