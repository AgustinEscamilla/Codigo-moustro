export function ItemList({ items, renderItem }) {
  if (!items || items.length === 0) return <p>No hay datos para mostrar.</p>;

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li key={item.id || index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          {/* Aquí inyectamos el diseño específico de cada item */}
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}