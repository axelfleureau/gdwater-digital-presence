
import { useContactForm } from "@/hooks/useContactForm";
import ContactFormFields from "./contact/ContactFormFields";
import ContactInfo from "./contact/ContactInfo";
import ProductBenefits from "./contact/ProductBenefits";

const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  } = useContactForm();

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
              <ContactFormFields 
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            </form>
          </div>
          
          <div className="space-y-8">
            <ContactInfo />
            <ProductBenefits />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
