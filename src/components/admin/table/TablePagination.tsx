
import { Button } from "@/components/ui/button";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

interface TablePaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  visibleItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const TablePagination = ({
  currentPage,
  perPage,
  totalItems,
  visibleItems,
  onPrevious,
  onNext
}: TablePaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={7}>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gdwater-darkgray">
              Visualizzando {visibleItems} di {totalItems} risultati
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                disabled={currentPage === 0}
              >
                Precedente
              </Button>
              <span className="text-sm">
                Pagina {currentPage + 1} di {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onNext}
                disabled={(currentPage + 1) * perPage >= totalItems}
              >
                Successiva
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
