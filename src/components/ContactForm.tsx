
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cellulare: "",
    email: "",
    localita: "",
    messaggio: "",
    privacy: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacy: checked
    }));

    // Clear privacy error when checking the box
    if (errors.privacy && checked) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.privacy;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Campo obbligatorio";
    if (!formData.cellulare.trim()) newErrors.cellulare = "Campo obbligatorio";
    if (!formData.email.trim()) newErrors.email = "Campo obbligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email non valida";
    if (!formData.localita.trim()) newErrors.localita = "Campo obbligatorio";
    if (!formData.privacy) newErrors.privacy = "Devi accettare la privacy policy";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real scenario, this would send the data to a server
      console.log("Form data submitted:", formData);
      toast.success("La tua richiesta è stata inviata con successo! Ti contatteremo al più presto.");

      // Reset form
      setFormData({
        nome: "",
        cellulare: "",
        email: "",
        localita: "",
        messaggio: "",
        privacy: false
      });
    }
  };

  return (
    <section id="contatti" className="py-20 bg-gdwater-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gdwater-darkblue mb-4">Contattaci</h2>
          <p className="text-lg text-gdwater-darkgray max-w-3xl mx-auto">
            Siamo pronti ad aiutarti a trovare la soluzione ideale per la tua azienda.
            Compila il modulo e un nostro esperto ti contatterà al più presto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gdwater-darkblue mb-6">Invia una richiesta</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome e cognome *</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className={errors.nome ? "border-red-500" : ""} />
                {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cellulare">Cellulare *</Label>
                <Input id="cellulare" name="cellulare" type="tel" value={formData.cellulare} onChange={handleChange} className={errors.cellulare ? "border-red-500" : ""} />
                {errors.cellulare && <p className="text-red-500 text-sm">{errors.cellulare}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? "border-red-500" : ""} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="localita">Località *</Label>
                <Input id="localita" name="localita" value={formData.localita} onChange={handleChange} className={errors.localita ? "border-red-500" : ""} />
                {errors.localita && <p className="text-red-500 text-sm">{errors.localita}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="messaggio">Messaggio</Label>
                <Textarea id="messaggio" name="messaggio" value={formData.messaggio} onChange={handleChange} rows={4} />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="privacy" checked={formData.privacy} onCheckedChange={handleCheckboxChange} className={errors.privacy ? "border-red-500" : ""} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Acconsento al trattamento dei dati personali *
                  </Label>
                  {errors.privacy && <p className="text-red-500 text-sm">{errors.privacy}</p>}
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-gdwater-blue hover:bg-gdwater-darkblue text-white py-6">
                Invia richiesta
              </Button>
              
              <p className="text-sm text-gdwater-darkgray mt-4">
                * Campi obbligatori
              </p>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gdwater-darkblue mb-6">Hai bisogno di assistenza?</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-gdwater-gray p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-gdwater-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gdwater-darkgray">Telefono</p>
                    <p className="text-lg font-medium">349/3835747</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gdwater-gray p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-gdwater-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gdwater-darkgray">Email</p>
                    <p className="text-lg font-medium">commerciale@gdwater.it</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gdwater-gray p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-gdwater-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gdwater-darkgray">Sede</p>
                    <p className="text-lg font-medium">Via del Lavoro 8
33048 San Giovanni Al Natisone - Udine</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gdwater-darkblue mb-4">Perché scegliere i nostri erogatori d'acqua?</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gdwater-blue mr-2 mt-1">✓</span>
                  <span>Risparmio economico e riduzione dei costi di gestione</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gdwater-blue mr-2 mt-1">✓</span>
                  <span>Acqua sempre fresca e di qualità superiore</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gdwater-blue mr-2 mt-1">✓</span>
                  <span>Impatto ambientale ridotto eliminando la plastica monouso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gdwater-blue mr-2 mt-1">✓</span>
                  <span>Assistenza tecnica dedicata</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gdwater-blue mr-2 mt-1">✓</span>
                  <span>Prodotti Made in Italy con garanzia di qualità</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
