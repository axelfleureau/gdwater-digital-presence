
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Trash2, Edit, Check, X, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  nome: string;
  cellulare: string;
  email: string;
  localita: string;
  messaggio: string;
  consenso_privacy: boolean;
  cookie_policy: boolean;
  scaricato: boolean;
  created_at: string;
}

const ContactsTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Contact>>({});
  const navigate = useNavigate();

  // Stato di paginazione
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Contatto di esempio per fallback
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

  useEffect(() => {
    fetchContacts();
  }, [page, perPage, searchTerm]);

  const fetchContacts = async () => {
    setLoading(true);

    try {
      console.log("Inizio fetchContacts con parametri:", { page, perPage, searchTerm });
      
      // Verifica se ci sono contatti salvati in localStorage per il fallback
      const savedContacts = localStorage.getItem('gdwater_contacts');
      let localContacts = savedContacts ? JSON.parse(savedContacts) : [];
      
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
        if (localContacts.length > 0) {
          console.log("Usando contatti dal localStorage come fallback");
          setContacts(localContacts);
          setTotal(localContacts.length);
          setLoading(false);
          return;
        }
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
      
      // Se count è 0, non applica il range per evitare errori
      if (count && count > 0) {
        dataQuery = dataQuery.range(page * perPage, (page * perPage) + perPage - 1);
      }

      const { data, error } = await dataQuery;

      console.log("Risultato query contatti:", { data, error, count });

      if (error) {
        console.error("Errore nel recupero dei contatti:", error);
        // Fallback ai contatti locali se disponibili
        if (localContacts.length > 0) {
          setContacts(localContacts);
          setTotal(localContacts.length);
          toast.error("Errore nel caricamento dei dati dal server, usando dati locali");
        } else {
          // Fallback al contatto di esempio se non ci sono contatti locali
          setContacts([sampleContact]);
          setTotal(1);
          toast.error("Errore nel caricamento dei dati, usando contatto di esempio");
          
          // Salva il contatto di esempio nel localStorage per futuri fallback
          localStorage.setItem('gdwater_contacts', JSON.stringify([sampleContact]));
        }
        return;
      }

      // Se non ci sono dati dal database, usa il fallback
      if (!data || data.length === 0) {
        console.log("Nessun contatto trovato nel database");
        
        // Se ci sono contatti nel localStorage, usali come fallback
        if (localContacts.length > 0) {
          console.log("Usando contatti dal localStorage");
          setContacts(localContacts);
          setTotal(localContacts.length);
        } else {
          // Altrimenti usa il contatto di esempio
          console.log("Usando contatto di esempio");
          setContacts([sampleContact]);
          setTotal(1);
          
          // Salva il contatto di esempio nel localStorage per futuri fallback
          localStorage.setItem('gdwater_contacts', JSON.stringify([sampleContact]));
        }
      } else {
        console.log("Contatti caricati con successo:", data.length);
        setContacts(data);
        
        // Salva i contatti nel localStorage per futuri fallback
        localStorage.setItem('gdwater_contacts', JSON.stringify(data));
      }
    } catch (error) {
      console.error("Errore imprevisto:", error);
      
      // Fallback al localStorage o al contatto di esempio
      const savedContacts = localStorage.getItem('gdwater_contacts');
      if (savedContacts) {
        const localContacts = JSON.parse(savedContacts);
        setContacts(localContacts);
        setTotal(localContacts.length);
        toast.error("Errore imprevisto, usando dati salvati localmente");
      } else {
        setContacts([sampleContact]);
        setTotal(1);
        toast.error("Errore imprevisto, usando contatto di esempio");
        localStorage.setItem('gdwater_contacts', JSON.stringify([sampleContact]));
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContacts(contacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo contatto?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contatti_clienti')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Errore nell'eliminazione:", error);
        toast.error("Errore nell'eliminazione del contatto");
        return;
      }

      // Aggiorna anche lo storage locale
      const savedContacts = localStorage.getItem('gdwater_contacts');
      if (savedContacts) {
        const localContacts = JSON.parse(savedContacts);
        const updatedContacts = localContacts.filter((contact: Contact) => contact.id !== id);
        localStorage.setItem('gdwater_contacts', JSON.stringify(updatedContacts));
      }

      toast.success("Contatto eliminato con successo");
      setContacts(contacts.filter(contact => contact.id !== id));
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } catch (error) {
      console.error("Errore imprevisto:", error);
      toast.error("Si è verificato un errore imprevisto");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedContacts.length === 0) {
      toast.error("Nessun contatto selezionato");
      return;
    }

    if (!window.confirm(`Sei sicuro di voler eliminare ${selectedContacts.length} contatti?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contatti_clienti')
        .delete()
        .in('id', selectedContacts);

      if (error) {
        console.error("Errore nell'eliminazione multipla:", error);
        toast.error("Errore nell'eliminazione dei contatti");
        return;
      }

      // Aggiorna anche lo storage locale
      const savedContacts = localStorage.getItem('gdwater_contacts');
      if (savedContacts) {
        const localContacts = JSON.parse(savedContacts);
        const updatedContacts = localContacts.filter((contact: Contact) => !selectedContacts.includes(contact.id));
        localStorage.setItem('gdwater_contacts', JSON.stringify(updatedContacts));
      }

      toast.success(`${selectedContacts.length} contatti eliminati con successo`);
      fetchContacts();
      setSelectedContacts([]);
    } catch (error) {
      console.error("Errore imprevisto:", error);
      toast.error("Si è verificato un errore imprevisto");
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setEditFormData(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setEditFormData({});
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editingContact || !editFormData) return;

    try {
      const { error } = await supabase
        .from('contatti_clienti')
        .update(editFormData)
        .eq('id', editingContact.id);

      if (error) {
        console.error("Errore nell'aggiornamento:", error);
        toast.error("Errore nell'aggiornamento del contatto");
        return;
      }

      // Aggiorna anche lo storage locale
      const savedContacts = localStorage.getItem('gdwater_contacts');
      if (savedContacts) {
        const localContacts = JSON.parse(savedContacts);
        const updatedContacts = localContacts.map((contact: Contact) => 
          contact.id === editingContact.id ? {...contact, ...editFormData} : contact
        );
        localStorage.setItem('gdwater_contacts', JSON.stringify(updatedContacts));
      }

      toast.success("Contatto aggiornato con successo");
      fetchContacts();
      setEditingContact(null);
      setEditFormData({});
    } catch (error) {
      console.error("Errore imprevisto:", error);
      toast.error("Si è verificato un errore imprevisto");
    }
  };

  const downloadCSV = async (selectedOnly: boolean = false) => {
    try {
      let dataToExport;

      if (selectedOnly) {
        if (selectedContacts.length === 0) {
          toast.error("Nessun contatto selezionato per il download");
          return;
        }
        dataToExport = contacts.filter(contact => selectedContacts.includes(contact.id));
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
        } else {
          dataToExport = data;
        }
      }

      if (!dataToExport || dataToExport.length === 0) {
        toast.error("Nessun dato da esportare");
        return;
      }

      // Crea CSV
      const headers = ["ID", "Nome", "Cellulare", "Email", "Località", "Messaggio", "Privacy", "Cookie", "Scaricato", "Data creazione"];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(contact => [
          contact.id,
          `"${contact.nome.replace(/"/g, '""')}"`,
          `"${contact.cellulare.replace(/"/g, '""')}"`,
          `"${contact.email.replace(/"/g, '""')}"`,
          `"${contact.localita?.replace(/"/g, '""') || ''}"`,
          `"${contact.messaggio?.replace(/"/g, '""') || ''}"`,
          contact.consenso_privacy ? "Sì" : "No",
          contact.cookie_policy ? "Sì" : "No",
          contact.scaricato ? "Sì" : "No",
          formatDate(contact.created_at)
        ].join(','))
      ].join('\n');

      // Crea blob e link per il download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `contatti_gdwater_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Aggiorna flag "scaricato"
      if (dataToExport.length > 0) {
        const idsToUpdate = dataToExport.map(contact => contact.id);
        
        const { error } = await supabase
          .from('contatti_clienti')
          .update({ scaricato: true })
          .in('id', idsToUpdate);

        if (error) {
          console.error("Errore nell'aggiornamento del flag scaricato:", error);
        } else {
          // Aggiorna anche i contatti visualizzati
          setContacts(contacts.map(contact => 
            idsToUpdate.includes(contact.id) ? {...contact, scaricato: true} : contact
          ));
          
          // Aggiorna anche lo storage locale
          const savedContacts = localStorage.getItem('gdwater_contacts');
          if (savedContacts) {
            const localContacts = JSON.parse(savedContacts);
            const updatedContacts = localContacts.map((contact: Contact) => 
              idsToUpdate.includes(contact.id) ? {...contact, scaricato: true} : contact
            );
            localStorage.setItem('gdwater_contacts', JSON.stringify(updatedContacts));
          }
          
          toast.success(`${dataToExport.length} contatti scaricati e marcati come 'scaricati'`);
        }
      }
    } catch (error) {
      console.error("Errore durante l'esportazione:", error);
      toast.error("Si è verificato un errore durante l'esportazione");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gdwater-darkblue">Gestione Contatti</h1>
        
        <div className="flex items-center gap-2">
          <Input
            placeholder="Cerca per nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="h-10 w-10 text-gdwater-blue animate-spin mx-auto mb-4" />
            <p className="text-gdwater-darkgray">Caricamento dati...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gdwater-darkgray">Nessun contatto trovato</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2 justify-between items-center">
              <div>
                <span className="text-sm text-gdwater-darkgray">
                  {selectedContacts.length} di {total} contatti selezionati
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadCSV(true)}
                  disabled={selectedContacts.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Scarica selezionati
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadCSV(false)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Scarica tutti
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedContacts.length === 0}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Elimina selezionati
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Input
                        type="checkbox"
                        checked={selectedContacts.length === contacts.length && contacts.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contatto</TableHead>
                    <TableHead>Località</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Scaricato</TableHead>
                    <TableHead>Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map(contact => (
                    <TableRow key={contact.id} className={selectedContacts.includes(contact.id) ? "bg-blue-50" : ""}>
                      <TableCell>
                        <Input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleSelectContact(contact.id)}
                          className="w-4 h-4"
                        />
                      </TableCell>

                      {editingContact && editingContact.id === contact.id ? (
                        // Modalità edit
                        <>
                          <TableCell>
                            <Input
                              name="nome"
                              value={editFormData.nome || ""}
                              onChange={handleEditChange}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <Input
                                  name="cellulare"
                                  value={editFormData.cellulare || ""}
                                  onChange={handleEditChange}
                                  className="w-full"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <Input
                                  name="email"
                                  value={editFormData.email || ""}
                                  onChange={handleEditChange}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <Input
                                name="localita"
                                value={editFormData.localita || ""}
                                onChange={handleEditChange}
                                className="w-full"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(contact.created_at)}</TableCell>
                          <TableCell>
                            {contact.scaricato ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check className="h-3 w-3 mr-1" /> Sì
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                <X className="h-3 w-3 mr-1" /> No
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={handleSaveEdit}
                                className="text-green-600 hover:text-green-800 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={handleCancelEdit}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        // Modalità visualizzazione
                        <>
                          <TableCell>{contact.nome}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-gdwater-blue mr-2" />
                                <span className="text-sm">{contact.cellulare}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gdwater-blue mr-2" />
                                <span className="text-sm">{contact.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gdwater-blue mr-2" />
                              <span>{contact.localita || "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(contact.created_at)}</TableCell>
                          <TableCell>
                            {contact.scaricato ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check className="h-3 w-3 mr-1" /> Sì
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                <X className="h-3 w-3 mr-1" /> No
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditClick(contact)}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDelete(contact.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gdwater-darkgray">
                          Visualizzando {contacts.length} di {total} risultati
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                          >
                            Precedente
                          </Button>
                          <span className="text-sm">
                            Pagina {page + 1} di {Math.max(1, Math.ceil(total / perPage))}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(page + 1)}
                            disabled={(page + 1) * perPage >= total}
                          >
                            Successiva
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactsTable;
