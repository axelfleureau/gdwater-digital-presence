
import { Button } from "@/components/ui/button";

const Prodotti = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contatti');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="prodotti" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">I nostri prodotti</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            Scopri la nostra gamma di dispenser professionali progettati per ambienti aziendali e industriali.
            Soluzioni efficienti, moderne e dal design elegante che si adattano a ogni esigenza.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/64422d28-970f-4f00-908c-b37b7f69df8c.png" 
                alt="Dispenser da pavimento" 
                className="w-full h-auto object-contain rounded-lg shadow-md" 
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Dispenser da pavimento</h3>
              <p className="text-gdwater-darkgray">
                Ideali per aree comuni aziendali e spazi con alto traffico. Offrono grande capacità
                e versatilità di erogazione per soddisfare le esigenze di uffici, sale d'attesa e mense.
              </p>
              <ul className="space-y-2 text-gdwater-darkgray">
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Opzioni di acqua fredda, ambiente e frizzante
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Design elegante e compatto
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Tecnologia touch o meccanica
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/de1c3143-d4f1-44f1-87c2-b91594710c95.png" 
                alt="Dispenser da banco" 
                className="w-full h-auto object-contain rounded-lg shadow-md" 
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Dispenser da banco</h3>
              <p className="text-gdwater-darkgray">
                Soluzione salvaspazio perfetta per cucine aziendali, sale riunioni e piccoli uffici.
                Design moderno che si integra facilmente in qualsiasi ambiente professionale.
              </p>
              <ul className="space-y-2 text-gdwater-darkgray">
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Soluzioni compatte ad alte prestazioni
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Facile installazione e manutenzione
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Ideali per spazi ridotti
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/30c16c4a-d469-4e18-80ce-ffe857a17a4a.png" 
                alt="Dispenser industriali" 
                className="w-full h-auto object-contain rounded-lg shadow-md" 
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Dispenser industriali</h3>
              <p className="text-gdwater-darkgray">
                Progettati per ambienti industriali e produttivi con elevate necessità di consumo.
                Garantiscono efficienza e affidabilità anche in contesti di utilizzo intensivo.
              </p>
              <ul className="space-y-2 text-gdwater-darkgray">
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Alta capacità di erogazione
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Materiali resistenti e duraturi
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Configurazioni personalizzabili
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/48aa6ebc-a760-4612-be37-fa3d3a29dc41.png" 
                alt="Dispenser multifunzione" 
                className="w-full h-auto object-contain rounded-lg shadow-md" 
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Dispenser multifunzione</h3>
              <p className="text-gdwater-darkgray">
                Soluzioni avanzate che combinano diverse opzioni di erogazione in un unico sistema.
                Ideali per hotel, centri conferenze e spazi aziendali di rappresentanza.
              </p>
              <ul className="space-y-2 text-gdwater-darkgray">
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Design premium ed elegante
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Tecnologia avanzata di filtrazione
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Opzioni di personalizzazione estetica
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={scrollToContact}
            className="bg-gdwater-blue hover:bg-gdwater-darkblue text-white px-8 py-6 text-lg"
          >
            Richiedi un preventivo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Prodotti;
