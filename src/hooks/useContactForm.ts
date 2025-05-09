
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type ContactFormData = {
  nome: string;
  cellulare: string;
  email: string;
  localita: string;
  messaggio: string;
  privacy: boolean;
  cookie_policy: boolean;
};

export type FormErrors = Record<string, string>;

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    cellulare: "",
    email: "",
    localita: "",
    messaggio: "",
    privacy: false,
    cookie_policy: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // Clear error when checking the box
    if (errors[name] && checked) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Campo obbligatorio";
    if (!formData.cellulare.trim()) newErrors.cellulare = "Campo obbligatorio";
    if (!formData.email.trim()) newErrors.email = "Campo obbligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email non valida";
    if (!formData.localita.trim()) newErrors.localita = "Campo obbligatorio";
    if (!formData.privacy) newErrors.privacy = "Devi accettare la privacy policy";
    if (!formData.cookie_policy) newErrors.cookie_policy = "Devi accettare la cookie policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Salva i dati nel database Supabase
        const { error } = await supabase
          .from('contatti_clienti')
          .insert({
            nome: formData.nome,
            cellulare: formData.cellulare,
            email: formData.email,
            localita: formData.localita,
            messaggio: formData.messaggio,
            consenso_privacy: formData.privacy,
            cookie_policy: formData.cookie_policy
          });

        if (error) {
          console.error("Errore durante il salvataggio:", error);
          toast.error("Si è verificato un errore. Riprova più tardi.");
          return;
        }

        // Invia l'email di notifica tramite la funzione edge
        const emailResponse = await supabase.functions.invoke('send-notification', {
          body: {
            nome: formData.nome,
            cellulare: formData.cellulare,
            email: formData.email,
            localita: formData.localita,
            messaggio: formData.messaggio || "Nessun messaggio"
          }
        });

        if (emailResponse.error) {
          console.warn("Errore nell'invio dell'email:", emailResponse.error);
          // Continuiamo comunque perché il dato è stato salvato
        }

        toast.success("La tua richiesta è stata inviata con successo! Ti contatteremo al più presto.");

        // Reset form
        setFormData({
          nome: "",
          cellulare: "",
          email: "",
          localita: "",
          messaggio: "",
          privacy: false,
          cookie_policy: false
        });
      } catch (error) {
        console.error("Errore durante l'invio:", error);
        toast.error("Si è verificato un errore. Riprova più tardi.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  };
};
