export function Modal({ isOpen, children }) {

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Nos aseguramos de que siempre esté al frente
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '30px',
          width: '400px',
          color: '#000', // Para evitar que se vea mal si tienes el Dark Mode
          borderRadius: '8px' // Un toque de diseño
        }}
      >
        {/* Aquí es donde ocurre la magia de la Composición */}
        {children}
      </div>
    </div>
  );
}