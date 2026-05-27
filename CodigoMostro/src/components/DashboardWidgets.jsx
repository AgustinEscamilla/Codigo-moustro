export function DashboardWidgets({ addNotification }) {
  return (
    <>
      <div style={{ marginTop: '40px' }}>
        <h2>Random Sections</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => addNotification(`Clicked ${num}`)}>Action {num}</button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Another Massive Section</h2>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={{ border: '1px solid #999', padding: '20px', marginBottom: '10px' }}>
            <h3>Card {item}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button onClick={() => addNotification(`Card ${item}`)}>Notify</button>
          </div>
        ))}
      </div>
    </>
  );
}