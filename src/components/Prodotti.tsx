
import { Button } from "@/components/ui/button";

const Prodotti = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contatti');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="prodotti" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">I nostri prodotti</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            Scopri la nostra gamma di erogatori d'acqua professionali progettati per ambienti aziendali e industriali.
            Soluzioni efficienti, moderne e dal design elegante che si adattano a ogni esigenza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img src="/lovable-uploads/9c585076-0a67-4bc0-af6f-71e8cc8d6810.png" alt="H2 Office" className="w-full h-auto object-contain rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">H2 Office</h3>
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
              <img src="/lovable-uploads/7d235a7d-2511-4f95-8758-4007a48082b0.png" alt="Euros 150" className="w-full h-auto object-contain rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Euros 150</h3>
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
              <img src="/lovable-uploads/21caac72-3e30-4513-8d4f-50b4a39bd843.png" alt="Euros 120" className="w-full h-auto object-contain rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Euros 120</h3>
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
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <img src="/lovable-uploads/0ffff740-20fc-43c6-951f-2087b14512c7.png" alt="Euros 80" className="w-full h-auto object-contain rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gdwater-darkblue">Euros 80</h3>
              <p className="text-gdwater-darkgray">
                Soluzione compatta e versatile per piccoli uffici e spazi di lavoro.
                Combina funzionalità complete in un design razionale e di facile utilizzo.
              </p>
              <ul className="space-y-2 text-gdwater-darkgray">
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Dimensioni compatte
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Semplicità di utilizzo
                </li>
                <li className="flex items-center">
                  <span className="text-gdwater-blue mr-2">✓</span> Manutenzione ridotta
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button onClick={scrollToContact} className="bg-gdwater-blue hover:bg-gdwater-darkblue text-white px-8 py-6 text-lg">
            Richiedi un preventivo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Prodotti;
