
import { Card } from "@/components/ui/card";

const Soluzioni = () => {
  const soluzioni = [{
    icon: "💧",
    title: "Acqua microfiltrata",
    description: "Sistemi di filtrazione avanzati per un'acqua pura e cristallina direttamente al punto di utilizzo."
  }, {
    icon: "❄️",
    title: "Acqua fredda",
    description: "Eroga acqua sempre fresca grazie ai nostri sistemi di raffreddamento di ultima generazione."
  }, {
    icon: "♨️",
    title: "Acqua calda",
    description: "Acqua calda istantanea per tè, caffè e altre bevande, disponibile in ogni momento."
  }, {
    icon: "✨",
    title: "Acqua frizzante",
    description: "Acqua frizzante di qualità superiore."
  }];
  
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
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border border-gdwater-gray hover:border-gdwater-blue">
              <div className="text-5xl mb-4">{soluzione.icon}</div>
              <h3 className="text-xl font-bold text-gdwater-darkblue mb-2">{soluzione.title}</h3>
              <p className="text-gdwater-darkgray">{soluzione.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gdwater-blue mb-6">Modelli per ogni esigenza</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img src="/lovable-uploads/9c585076-0a67-4bc0-af6f-71e8cc8d6810.png" alt="H2 Office" className="w-full h-64 object-contain mb-4" />
              <h4 className="text-xl font-bold text-gdwater-darkblue">H2 Office</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img src="/lovable-uploads/7d235a7d-2511-4f95-8758-4007a48082b0.png" alt="Euros 150" className="w-full h-64 object-contain mb-4" />
              <h4 className="text-xl font-bold text-gdwater-darkblue">Euros 150</h4>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img src="/lovable-uploads/21caac72-3e30-4513-8d4f-50b4a39bd843.png" alt="Euros 150" className="w-full h-64 object-contain mb-4" />
              <h4 className="text-xl font-bold text-gdwater-darkblue">Euros 150</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Soluzioni;
