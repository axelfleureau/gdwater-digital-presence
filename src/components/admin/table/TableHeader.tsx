
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps {
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allSelected: boolean;
  hasContacts: boolean;
}

export const ContactsTableHeader = ({
  onSelectAll,
  allSelected,
  hasContacts
}: TableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <Input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            disabled={!hasContacts}
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
  );
};
