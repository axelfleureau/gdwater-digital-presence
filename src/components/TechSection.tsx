
import { Card } from "@/components/ui/card";
import { Droplet, Atom, Dna, FlaskConical, Beaker } from "lucide-react";

const TechSection = () => {
  const techFeatures = [
    {
      icon: <Droplet className="h-10 w-10 text-gdwater-blue" />,
      title: "Valorizzazione dell'acqua",
      description: "Rendiamo l'elemento base della nostra vita ancora migliore, che sia liscia, frizzante, fredda o calda."
    },
    {
      icon: <FlaskConical className="h-10 w-10 text-gdwater-blue" />,
      title: "Refiner allo stato dell'arte",
      description: "Affinatori progettati da zero per elevare l'acqua potabile ad un livello superiore."
    },
    {
      icon: <Beaker className="h-10 w-10 text-gdwater-blue" />,
      title: "Trattamenti selettivi",
      description: "Purifichiamo le acque su esigenze specifiche come rimuoverne la durezza o nitrati e arsenico."
    },
    {
      icon: <Atom className="h-10 w-10 text-gdwater-blue" />,
      title: "Osmosi Inversa",
      description: "Riduciamo sali, metalli e composti chimici dall'acqua per preservare i macchinari con un'eccellente qualità."
    },
    {
      icon: <Dna className="h-10 w-10 text-gdwater-blue" />,
      title: "Esperienza Trentennale",
      description: "Dal 1989 abbiamo fatto della purificazione e affinazione dell'acqua la nostra missione."
    }
  ];

  return (
    <section id="tecnologia" className="py-20 bg-gdwater-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">La Tecnologia è nel nostro DNA</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            Da oltre trent'anni sviluppiamo soluzioni innovative per il trattamento dell'acqua,
            combinando esperienza, ricerca e tecnologie all'avanguardia.
          </p>
        </div>
        
        {/* Counter row - optimized for mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-16 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold text-gdwater-blue mb-2">30+</span>
            <span className="text-xs md:text-sm text-gdwater-darkgray">Anni di<br className="md:hidden" /> esperienza</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold text-gdwater-blue mb-2">500+</span>
            <span className="text-xs md:text-sm text-gdwater-darkgray">Clienti<br className="md:hidden" /> soddisfatti</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold text-gdwater-blue mb-2">1000+</span>
            <span className="text-xs md:text-sm text-gdwater-darkgray">Installazioni<br className="md:hidden" /> completate</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techFeatures.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 border border-gdwater-gray hover:border-gdwater-blue">
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gdwater-darkblue mb-3">{feature.title}</h3>
              <p className="text-gdwater-darkgray">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
