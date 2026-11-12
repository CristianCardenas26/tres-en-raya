import CategoryTitleRow from "./CategoryTitleRow"
import ProductItemRow from "./ProductItemRow"

export default function CatalogTable({
  products,
  productSearch,
  showAvailableOnly,
}) {
  const groupedProducts = {}
  const tableContent = []
  const normalizedSearch = productSearch.toLowerCase().trim()

  const visibleProducts = products.filter((currentProduct) => {
    const productMatchesSearch = currentProduct.name
      .toLowerCase()
      .includes(normalizedSearch)

    const productMatchesStock = showAvailableOnly
      ? currentProduct.stocked
      : true

    return productMatchesSearch && productMatchesStock
  })

  visibleProducts.forEach((currentProduct) => {
    if (!groupedProducts[currentProduct.category]) {
      groupedProducts[currentProduct.category] = []
    }

    groupedProducts[currentProduct.category].push(currentProduct)
  })

  Object.keys(groupedProducts).forEach((currentCategory) => {
    tableContent.push(
      <CategoryTitleRow
        key={currentCategory}
        category={currentCategory}
      />
    )

    groupedProducts[currentCategory].forEach((currentProduct) => {
      tableContent.push(
        <ProductItemRow
          key={`${currentCategory}-${currentProduct.name}`}
          name={currentProduct.name}
          price={currentProduct.price}
          stocked={currentProduct.stocked}
        />
      )
    })
  })

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>

      <tbody>
        {tableContent.length > 0 ? (
          tableContent
        ) : (
          <tr>
            <td colSpan="2">No hay productos para mostrar</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}