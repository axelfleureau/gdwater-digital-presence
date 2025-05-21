
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ContactsTableHeader } from "./table/TableHeader";
import { TableActions } from "./table/TableActions";
import { ContactTableRow } from "./table/ContactTableRow";
import { TablePagination } from "./table/TablePagination";
import { EmptyState, LoadingState } from "./table/LoadingState";
import { useContacts } from "./hooks/useContacts";
import { Contact } from "./types/Contact";

const ContactsTable = () => {
  const {
    contacts,
    loading,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    perPage,
    total,
    handleDelete,
    handleDeleteSelected,
    downloadCSV,
    updateDownloadedFlag
  } = useContacts();

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Contact>>({});

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
      // Verifica se è un contatto di esempio
      if (editingContact.id === "sample-1") {
        toast.info("Non è possibile modificare il contatto di esempio");
        setEditingContact(null);
        setEditFormData({});
        return;
      }

      const { error } = await supabase
        .from('contatti_clienti')
        .update(editFormData)
        .eq('id', editingContact.id);

      if (error) {
        console.error("Errore nell'aggiornamento:", error);
        toast.error("Errore nell'aggiornamento del contatto");
        return;
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

  const handleDownload = async (selectedOnly: boolean) => {
    const result = await downloadCSV(selectedOnly, selectedContacts);
    
    if (!result) return;
    
    const { dataToExport } = result;

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

    // Aggiorna flag "scaricato" per i contatti reali
    if (dataToExport.length > 0) {
      // Filtra il contatto di esempio
      const idsToUpdate = dataToExport.map(contact => contact.id);
      const updated = await updateDownloadedFlag(idsToUpdate);
      
      if (updated) {
        toast.success(`${idsToUpdate.length} contatti marcati come 'scaricati'`);
      } else {
        toast.info("Contatto demo scaricato (nessun aggiornamento nel database)");
      }
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
          <LoadingState />
        ) : contacts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TableActions 
              selectedCount={selectedContacts.length}
              totalCount={total}
              onDownloadSelected={() => handleDownload(true)}
              onDownloadAll={() => handleDownload(false)}
              onDeleteSelected={() => {
                handleDeleteSelected(selectedContacts);
                setSelectedContacts([]);
              }}
            />

            <div className="overflow-x-auto">
              <Table>
                <ContactsTableHeader 
                  onSelectAll={handleSelectAll}
                  allSelected={selectedContacts.length === contacts.length && contacts.length > 0}
                  hasContacts={contacts.length > 0}
                />
                
                <TableBody>
                  {contacts.map(contact => (
                    <ContactTableRow
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedContacts.includes(contact.id)}
                      isEditing={editingContact?.id === contact.id}
                      editFormData={editFormData}
                      onSelect={handleSelectContact}
                      onEditClick={handleEditClick}
                      onEditChange={handleEditChange}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                      onDelete={handleDelete}
                      formatDate={formatDate}
                    />
                  ))}
                </TableBody>

                <TablePagination
                  currentPage={page}
                  perPage={perPage}
                  totalItems={total}
                  visibleItems={contacts.length}
                  onPrevious={() => setPage(Math.max(0, page - 1))}
                  onNext={() => setPage(page + 1)}
                />
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactsTable;
