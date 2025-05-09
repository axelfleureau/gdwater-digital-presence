
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContactFormData, FormErrors } from "@/hooks/useContactForm";

interface ContactFormFieldsProps {
  formData: ContactFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const ContactFormFields = ({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleCheckboxChange
}: ContactFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="nome">Nome e cognome *</Label>
        <Input 
          id="nome" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          className={errors.nome ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cellulare">Cellulare *</Label>
        <Input 
          id="cellulare" 
          name="cellulare" 
          type="tel" 
          value={formData.cellulare} 
          onChange={handleChange} 
          className={errors.cellulare ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        {errors.cellulare && <p className="text-red-500 text-sm">{errors.cellulare}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          className={errors.email ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="localita">Località *</Label>
        <Input 
          id="localita" 
          name="localita" 
          value={formData.localita} 
          onChange={handleChange} 
          className={errors.localita ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        {errors.localita && <p className="text-red-500 text-sm">{errors.localita}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="messaggio">Messaggio</Label>
        <Textarea 
          id="messaggio" 
          name="messaggio" 
          value={formData.messaggio} 
          onChange={handleChange} 
          rows={4} 
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="privacy" 
          checked={formData.privacy} 
          onCheckedChange={(checked) => handleCheckboxChange("privacy", checked === true)} 
          className={errors.privacy ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Acconsento al trattamento dei dati personali *
          </Label>
          {errors.privacy && <p className="text-red-500 text-sm">{errors.privacy}</p>}
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox 
          id="cookie_policy" 
          checked={formData.cookie_policy} 
          onCheckedChange={(checked) => handleCheckboxChange("cookie_policy", checked === true)} 
          className={errors.cookie_policy ? "border-red-500" : ""} 
          disabled={isSubmitting}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="cookie_policy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accetto la cookie policy *
          </Label>
          {errors.cookie_policy && <p className="text-red-500 text-sm">{errors.cookie_policy}</p>}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gdwater-blue hover:bg-gdwater-darkblue text-white py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
      </Button>
      
      <p className="text-sm text-gdwater-darkgray mt-4">
        * Campi obbligatori
      </p>
    </>
  );
};

export default ContactFormFields;
