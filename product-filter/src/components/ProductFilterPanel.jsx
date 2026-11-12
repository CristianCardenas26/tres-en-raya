export default function ProductFilterPanel({
  productSearch,
  onProductSearchChange,
  showAvailableOnly,
  onShowAvailableOnlyChange,
}) {
  return (
    <section className="filter-bar">
      <input
        type="text"
        placeholder="Buscar..."
        value={productSearch}
        onChange={(event) => onProductSearchChange(event.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(event) => onShowAvailableOnlyChange(event.target.checked)}
        />
        Mostrar solo productos disponibles
      </label>
    </section>
  )
}