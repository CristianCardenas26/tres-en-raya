import { useState } from "react"
import ProductFilterPanel from "./ProductFilterPanel"
import CatalogTable from "./CatalogTable"
import { products } from "../data/products"

export default function CatalogScreen() {
  const [productSearch, setProductSearch] = useState("")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  return (
    <section className="product-container">
      <ProductFilterPanel
        productSearch={productSearch}
        onProductSearchChange={setProductSearch}
        showAvailableOnly={showAvailableOnly}
        onShowAvailableOnlyChange={setShowAvailableOnly}
      />

      <CatalogTable
        products={products}
        productSearch={productSearch}
        showAvailableOnly={showAvailableOnly}
      />
    </section>
  )
}