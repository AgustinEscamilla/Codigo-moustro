import { useWindowSize } from '../hooks/useWindowSize';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useDashboardData } from '../hooks/useDashboardData';
import { useDashboardState } from '../hooks/useDashboardState';
import { StatCard } from './StatCard';
import { ItemList } from './ItemList';
import { Modal } from './Modal';
import { DashboardWidgets } from './DashboardWidgets';

export default function MonsterDashboard() {
  const { users, products, orders, loading, handleDeleteUser, handleDeleteProduct, handleDeleteOrder } = useDashboardData();
  const windowWidth = useWindowSize();
  const online = useOnlineStatus();

  // Todo el estado limpio en una sola línea gracias a tu custom hook
  const {
    search, setSearch, selectedUser, setSelectedUser, selectedProduct, setSelectedProduct,
    darkMode, setDarkMode, count, setCount, tab, setTab, message, setMessage, filter, setFilter,
    price, setPrice, showModal, setShowModal, notifications, inputValue, setInputValue,
    fullName, theme, addNotification, expensiveUsers, expensiveProducts
  } = useDashboardState(users, products);

  return (
    <div style={{ background: darkMode ? '#111' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh', padding: '20px' }}>
      <h1>Monster Dashboard</h1>

      {/* Controles Globales */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
        <button onClick={() => { const newCount = count + 1; setCount(newCount); document.title = newCount; }}>Count {count}</button>
        <button onClick={() => setShowModal(!showModal)}>Toggle Modal</button>
      </div>

      {/* Navegación de Pestañas */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setTab('users')}>Users</button>
        <button onClick={() => setTab('products')}>Products</button>
        <button onClick={() => setTab('orders')}>Orders</button>
      </div>

      {/* Inputs de Búsqueda y Filtros */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Another input" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Window Width: {windowWidth} | Online: {online ? 'Yes' : 'No'} | Theme: {theme} | Full Name: {fullName}</p>
      </div>

      {loading && <p>Loading...</p>}

      {/* Tarjetas de Estadísticas */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <StatCard title="Total Users" count={users.length} />
        <StatCard title="Total Products" count={products.length} />
        <StatCard title="Total Orders" count={orders.length} />
      </div>

      {/* Contenido Dinámico de las Pestañas */}
      {tab === 'users' && (
        <div>
          <h2>Users</h2>
          <ItemList
            items={expensiveUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))}
            renderItem={(user) => (
              <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                <h3>{user.name}</h3><p>{user.role}</p><p>{user.total}</p>
                <button onClick={() => { setSelectedUser(user); addNotification('User selected'); }}>Select</button>
                <button onClick={() => { handleDeleteUser(user.id); addNotification('User deleted'); }}>Delete</button>
              </div>
            )}
          />
          {selectedUser && <div style={{ border: '2px solid blue', padding: '20px', marginTop: '20px' }}><h3>Selected User</h3><p>{selectedUser.name}</p></div>}
        </div>
      )}

      {tab === 'products' && (
        <div>
          <h2>Products</h2>
          <ItemList
            items={expensiveProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))}
            renderItem={(product) => (
              <div style={{ border: '1px solid green', padding: '10px', marginBottom: '10px' }}>
                <h3>{product.name}</h3><p>${product.price}</p><p>{product.total}</p>
                <button onClick={() => { setSelectedProduct(product); addNotification('Product selected'); }}>Select</button>
                <button onClick={() => { handleDeleteProduct(product.id); addNotification('Product deleted'); }}>Delete</button>
              </div>
            )}
          />
          {selectedProduct && <div style={{ border: '2px solid green', padding: '20px', marginTop: '20px' }}><h3>Selected Product</h3><p>{selectedProduct.name}</p></div>}
        </div>
      )}

      {tab === 'orders' && (
        <div>
          <h2>Orders</h2>
          <ItemList
            items={orders}
            renderItem={(order) => (
              <div style={{ border: '1px solid orange', padding: '10px', marginBottom: '10px' }}>
                <h3>Order #{order.id}</h3><p>Total: ${order.total}</p>
                <button onClick={() => { handleDeleteOrder(order.id); addNotification('Order deleted'); }}>Delete</button>
              </div>
            )}
          />
        </div>
      )}

      {/* Lista de Notificaciones */}
      <div style={{ marginTop: '40px' }}>
        <h2>Notifications</h2>
        {notifications.map((n) => (
          <div key={n.id} style={{ background: '#222', color: '#fff', padding: '10px', marginBottom: '10px' }}>{n.text}</div>
        ))}
      </div>

      {/* El Modal usando Composición */}
      <Modal isOpen={showModal}>
        <h2>Modal</h2>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => { addNotification(message); setShowModal(false); }}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>

      {/* Secciones Gigantes Extraídas */}
      <DashboardWidgets addNotification={addNotification} />
    </div>
  );
}