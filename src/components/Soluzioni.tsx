
import { Card } from "@/components/ui/card";

const Soluzioni = () => {
  const soluzioni = [
    {
      icon: "💧",
      title: "Acqua filtrata",
      description: "Sistemi di filtrazione avanzati per un'acqua pura e cristallina direttamente al punto di utilizzo."
    },
    {
      icon: "❄️",
      title: "Acqua fredda",
      description: "Eroga acqua sempre fresca grazie ai nostri sistemi di raffreddamento di ultima generazione."
    },
    {
      icon: "♨️",
      title: "Acqua calda",
      description: "Acqua calda istantanea per tè, caffè e altre bevande, disponibile in ogni momento."
    },
    {
      icon: "✨",
      title: "Acqua frizzante",
      description: "Sistemi di carbonatazione integrati per un'acqua frizzante di qualità superiore."
    }
  ];

  return (
    <section id="soluzioni" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">Le nostre soluzioni</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            GD Water offre una gamma completa di soluzioni per l'erogazione dell'acqua, adattabili alle esigenze di ogni ambiente di lavoro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soluzioni.map((soluzione, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gdwater-gray">
              <div className="text-5xl mb-4">{soluzione.icon}</div>
              <h3 className="text-xl font-bold text-gdwater-darkblue mb-2">{soluzione.title}</h3>
              <p className="text-gdwater-darkgray">{soluzione.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gdwater-blue mb-6">Porta il cambiamento nella tua azienda</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/ced391e3-6882-4ae5-a56f-5b325e1281f9.png" 
                alt="Dispenser a colonna" 
                className="w-full h-64 object-contain mb-4" 
              />
              <h4 className="text-xl font-bold text-gdwater-darkblue">Dispenser a colonna</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/bb5f5719-5bbc-403f-ab9d-a9168373cad9.png" 
                alt="Dispenser da banco" 
                className="w-full h-64 object-contain mb-4" 
              />
              <h4 className="text-xl font-bold text-gdwater-darkblue">Dispenser da banco</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img 
                src="/lovable-uploads/1d7f7f38-af5b-4d32-8bba-b407616d66b0.png" 
                alt="Dispenser industriale" 
                className="w-full h-64 object-contain mb-4" 
              />
              <h4 className="text-xl font-bold text-gdwater-darkblue">Dispenser industriale</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Soluzioni;
