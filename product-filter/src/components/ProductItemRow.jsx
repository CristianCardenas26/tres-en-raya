export default function ProductItemRow({ name, price, stocked }) {
  const visibleName = stocked ? name : <span className="out-stock">{name}</span>

  return (
    <tr>
      <td>{visibleName}</td>
      <td>{price}</td>
    </tr>
  )
}
