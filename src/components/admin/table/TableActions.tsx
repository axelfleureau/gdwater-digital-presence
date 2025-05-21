
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

interface TableActionsProps {
  selectedCount: number;
  totalCount: number;
  onDownloadSelected: () => void;
  onDownloadAll: () => void;
  onDeleteSelected: () => void;
}

export const TableActions = ({
  selectedCount,
  totalCount,
  onDownloadSelected,
  onDownloadAll,
  onDeleteSelected
}: TableActionsProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2 justify-between items-center">
      <div>
        <span className="text-sm text-gdwater-darkgray">
          {selectedCount} di {totalCount} contatti selezionati
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownloadSelected}
          disabled={selectedCount === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Scarica selezionati
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownloadAll}
        >
          <Download className="mr-2 h-4 w-4" />
          Scarica tutti
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Elimina selezionati
        </Button>
      </div>
    </div>
  );
};
