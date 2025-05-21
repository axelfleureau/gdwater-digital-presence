
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Check, Edit, Mail, MapPin, Phone, Trash2, X } from "lucide-react";
import React from "react";

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

interface ContactTableRowProps {
  contact: Contact;
  isSelected: boolean;
  isEditing: boolean;
  editFormData: Partial<Contact>;
  onSelect: (id: string) => void;
  onEditClick: (contact: Contact) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

export const ContactTableRow = ({
  contact,
  isSelected,
  isEditing,
  editFormData,
  onSelect,
  onEditClick,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  formatDate
}: ContactTableRowProps) => {
  return (
    <TableRow className={isSelected ? "bg-blue-50" : ""}>
      <TableCell>
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(contact.id)}
          className="w-4 h-4"
        />
      </TableCell>

      {isEditing ? (
        // Editing mode
        <>
          <TableCell>
            <Input
              name="nome"
              value={editFormData.nome || ""}
              onChange={onEditChange}
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
                  onChange={onEditChange}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input
                  name="email"
                  value={editFormData.email || ""}
                  onChange={onEditChange}
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
                onChange={onEditChange}
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
                onClick={onSaveEdit}
                className="text-green-600 hover:text-green-800 hover:bg-green-50"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onCancelEdit}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </>
      ) : (
        // View mode
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
                onClick={() => onEditClick(contact)}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDelete(contact.id)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
