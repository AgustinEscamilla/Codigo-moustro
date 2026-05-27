export function StatCard({ title, count }) {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '20px',
        width: '200px',
      }}
    >
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
}