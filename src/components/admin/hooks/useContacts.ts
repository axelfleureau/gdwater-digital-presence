
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Contact } from "../types/Contact";

// Sample contact for fallback
const sampleContact: Contact = {
  id: "sample-1",
  nome: "Contatto Demo",
  cellulare: "0431 1938144",
  email: "info@gdwater.it",
  localita: "Udine",
  messaggio: "Questo è un contatto di esempio per testare l'interfaccia",
  consenso_privacy: true,
  cookie_policy: true,
  scaricato: false,
  created_at: new Date().toISOString()
};

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchContacts = async () => {
    setLoading(true);

    try {
      console.log("Inizio fetchContacts con parametri:", { page, perPage, searchTerm });
      
      // Ottieni il conteggio totale
      let countQuery = supabase
        .from('contatti_clienti')
        .select('*', { count: 'exact', head: true });
      
      if (searchTerm) {
        countQuery = countQuery.ilike('nome', `%${searchTerm}%`);
      }

      const { count, error: countError } = await countQuery;

      console.log("Risultato conteggio:", { count, countError });

      if (countError) {
        console.error("Errore nel conteggio:", countError);
        // Fallback al contatto di esempio
        setContacts([sampleContact]);
        setTotal(1);
        toast.error("Errore nel caricamento dei dati, usando contatto di esempio");
        setLoading(false);
        return;
      }

      setTotal(count || 0);

      // Ottieni i dati paginati
      let dataQuery = supabase
        .from('contatti_clienti')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (searchTerm) {
        dataQuery = dataQuery.ilike('nome', `%${searchTerm}%`);
      }
      
      dataQuery = dataQuery.range(page * perPage, (page * perPage) + perPage - 1);

      const { data, error } = await dataQuery;

      console.log("Risultato query contatti:", { data, error, count });

      if (error) {
        console.error("Errore nel recupero dei contatti:", error);
        // Fallback al contatto di esempio
        setContacts([sampleContact]);
        setTotal(1);
        toast.error("Errore nel caricamento dei dati, usando contatto di esempio");
        return;
      }

      // Se non ci sono dati dal database, usa il fallback
      if (!data || data.length === 0) {
        console.log("Nessun contatto trovato nel database");
        
        // Prova a caricare tutti i contatti senza paginazione per vedere se ci sono dati
        const { data: allData, error: allError } = await supabase
          .from('contatti_clienti')
          .select('*')
          .limit(10);
          
        if (!allError && allData && allData.length > 0) {
          console.log("Trovati alcuni contatti senza paginazione:", allData.length);
          setContacts(allData);
          setTotal(allData.length);
        } else {
          console.log("Nessun contatto trovato, uso contatto di esempio");
          setContacts([sampleContact]);
          setTotal(1);
          toast.info("Nessun contatto trovato nel database, visualizzato un contatto di esempio");
        }
      } else {
        console.log("Contatti caricati con successo:", data.length);
        setContacts(data);
      }
    } catch (error) {
      console.error("Errore imprevisto:", error);
      // Fallback al contatto di esempio
      setContacts([sampleContact]);
      setTotal(1);
      toast.error("Errore imprevisto, usando contatto di esempio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, perPage, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo contatto?")) {
      return;
    }

    try {
      // Verifica se è un contatto di esempio
      if (id === "sample-1") {
        toast.info("Non è possibile eliminare il contatto di esempio");
        return;
      }

      const { error } = await supabase
        .from('contatti_clienti')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Errore nell'eliminazione:", error);
        toast.error("Errore nell'eliminazione del contatto");
        return;
      }

      toast.success("Contatto eliminato con successo");
      fetchContacts();
    } catch (error) {
      console.error("Errore imprevisto:", error);
      toast.error("Si è verificato un errore imprevisto");
    }
  };

  const handleDeleteSelected = async (selectedContacts: string[]) => {
    if (selectedContacts.length === 0) {
      toast.error("Nessun contatto selezionato");
      return;
    }

    if (!window.confirm(`Sei sicuro di voler eliminare ${selectedContacts.length} contatti?`)) {
      return;
    }

    try {
      // Verifica se ci sono contatti di esempio selezionati
      if (selectedContacts.includes("sample-1")) {
        toast.info("Non è possibile eliminare il contatto di esempio");
        return;
      }

      const { error } = await supabase
        .from('contatti_clienti')
        .delete()
        .in('id', selectedContacts);

      if (error) {
        console.error("Errore nell'eliminazione multipla:", error);
        toast.error("Errore nell'eliminazione dei contatti");
        return;
      }

      toast.success(`${selectedContacts.length} contatti eliminati con successo`);
      fetchContacts();
    } catch (error) {
      console.error("Errore imprevisto:", error);
      toast.error("Si è verificato un errore imprevisto");
    }
  };

  const downloadCSV = async (selectedOnly: boolean, selectedContacts: string[]) => {
    try {
      let dataToExport;

      if (selectedOnly) {
        if (selectedContacts.length === 0) {
          toast.error("Nessun contatto selezionato per il download");
          return;
        }
        
        // Verifica se ci sono solo contatti di esempio selezionati
        if (selectedContacts.length === 1 && selectedContacts[0] === "sample-1") {
          dataToExport = [sampleContact];
        } else {
          // Filtra il contatto di esempio e scarica solo i reali
          const realContactIds = selectedContacts.filter(id => id !== "sample-1");
          const { data, error } = await supabase
            .from('contatti_clienti')
            .select('*')
            .in('id', realContactIds);

          if (error) {
            console.error("Errore nel recupero dei contatti selezionati:", error);
            toast.error("Errore nel caricamento dei dati selezionati");
            return;
          }
          
          dataToExport = data;
        }
      } else {
        // Scarica tutti i contatti
        const { data, error } = await supabase
          .from('contatti_clienti')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Errore nel recupero dei contatti:", error);
          // Usa i contatti già caricati come fallback
          dataToExport = contacts;
          toast.warning("Usando i contatti già caricati per il download");
        } else if (!data || data.length === 0) {
          // Se non ci sono contatti nel database, usa il contatto di esempio
          dataToExport = [sampleContact];
        } else {
          dataToExport = data;
        }
      }

      if (!dataToExport || dataToExport.length === 0) {
        toast.error("Nessun dato da esportare");
        return;
      }

      return { dataToExport, contacts };
    } catch (error) {
      console.error("Errore durante l'esportazione:", error);
      toast.error("Si è verificato un errore durante l'esportazione");
      return null;
    }
  };

  const updateDownloadedFlag = async (ids: string[]) => {
    try {
      // Filtra il contatto di esempio
      const realContacts = ids.filter(id => id !== "sample-1");
      
      if (realContacts.length > 0) {
        const { error } = await supabase
          .from('contatti_clienti')
          .update({ scaricato: true })
          .in('id', realContacts);

        if (error) {
          console.error("Errore nell'aggiornamento del flag scaricato:", error);
          return false;
        }
        
        fetchContacts();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Errore durante l'aggiornamento del flag scaricato:", error);
      return false;
    }
  };

  return {
    contacts,
    loading,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    fetchContacts,
    handleDelete,
    handleDeleteSelected,
    downloadCSV,
    updateDownloadedFlag
  };
};
