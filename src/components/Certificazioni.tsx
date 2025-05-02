
import { Card } from "@/components/ui/card";

const Certificazioni = () => {
  const certificazioni = [
    {
      logo: "/lovable-uploads/dcf22e66-46a0-4f2d-be1e-4bba4b0f2f93.png",
      name: "ICM",
      description: "Certificazione di qualità internazionale"
    },
    {
      logo: "/lovable-uploads/052b4881-889d-49d6-bfb4-a50c1b844ff2.png",
      name: "IQNET",
      description: "The International Certification Network"
    },
    {
      logo: "/lovable-uploads/7e9f5547-b911-4d17-ab99-5286a3e16a0b.png",
      name: "ISO",
      description: "Certificazione di gestione ambientale"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">Certificazioni</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            La qualità dei nostri prodotti e servizi è garantita dalle più importanti certificazioni internazionali
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificazioni.map((cert, index) => (
            <Card key={index} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border border-gdwater-gray">
              <div className="h-24 flex items-center justify-center mb-4">
                <img 
                  src={cert.logo} 
                  alt={`Certificazione ${cert.name}`} 
                  className="max-h-full object-contain" 
                />
              </div>
              <h3 className="text-xl font-bold text-gdwater-darkblue mb-2">{cert.name}</h3>
              <p className="text-gdwater-darkgray">{cert.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gdwater-darkgray">
            Per maggiori informazioni sulle nostre certificazioni, visita la{' '}
            <a 
              href="https://www.gdwater.it/chi-siamo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gdwater-blue hover:underline"
            >
              pagina Chi Siamo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certificazioni;
