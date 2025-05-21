
import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="py-16 text-center">
      <Loader2 className="h-10 w-10 text-gdwater-blue animate-spin mx-auto mb-4" />
      <p className="text-gdwater-darkgray">Caricamento dati...</p>
    </div>
  );
};

export const EmptyState = () => {
  return (
    <div className="py-16 text-center">
      <p className="text-gdwater-darkgray">Nessun contatto trovato</p>
    </div>
  );
};
