
const ProductBenefits = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gdwater-darkblue mb-4">Perché scegliere i nostri erogatori d'acqua?</h3>
      
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="text-gdwater-blue mr-2 mt-1">✓</span>
          <span>Risparmio economico e riduzione dei costi di gestione</span>
        </li>
        <li className="flex items-start">
          <span className="text-gdwater-blue mr-2 mt-1">✓</span>
          <span>Acqua sempre fresca e di qualità superiore</span>
        </li>
        <li className="flex items-start">
          <span className="text-gdwater-blue mr-2 mt-1">✓</span>
          <span>Impatto ambientale ridotto eliminando la plastica monouso</span>
        </li>
        <li className="flex items-start">
          <span className="text-gdwater-blue mr-2 mt-1">✓</span>
          <span>Assistenza tecnica dedicata</span>
        </li>
        <li className="flex items-start">
          <span className="text-gdwater-blue mr-2 mt-1">✓</span>
          <span>Prodotti Made in Italy con garanzia di qualità</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductBenefits;
