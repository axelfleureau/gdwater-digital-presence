
import { Check } from "lucide-react";

const Vantaggi = () => {
  const vantaggi = [
    {
      title: "Sostenibilità ambientale",
      description: "Riduci il consumo di bottiglie di plastica monouso e contribuisci a diminuire l'impatto ambientale della tua azienda."
    },
    {
      title: "Risparmio economico",
      description: "Elimina costi di approvvigionamento, stoccaggio e smaltimento delle bottiglie di plastica, ottimizzando le risorse aziendali."
    },
    {
      title: "Qualità superiore",
      description: "Offri ai tuoi dipendenti e clienti acqua di alta qualità, filtrata e controllata, disponibile in diverse temperature."
    },
    {
      title: "Made in Italy",
      description: "I nostri erogatori d'acqua sono progettati e prodotti in Italia, garantendo eccellenza e affidabilità nel tempo."
    },
    {
      title: "Assistenza tecnica dedicata",
      description: "Servizio tecnico specializzato con interventi tempestivi e manutenzione programmata per garantire sempre la massima efficienza."
    },
    {
      title: "100+ installatori qualificati",
      description: "Una rete di professionisti esperti garantisce installazioni accurate e puntuali in tutta Italia."
    }
  ];

  return (
    <section id="vantaggi" className="py-20 bg-gdwater-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">Perché scegliere GD Water</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            Le nostre soluzioni di erogazione dell'acqua offrono numerosi vantaggi per la tua azienda, 
            combinando sostenibilità, convenienza e qualità italiana.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantaggi.map((vantaggio, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4 mt-1">
                <Check className="h-6 w-6 text-gdwater-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gdwater-darkblue mb-2">{vantaggio.title}</h3>
                <p className="text-gdwater-darkgray">{vantaggio.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vantaggi;
