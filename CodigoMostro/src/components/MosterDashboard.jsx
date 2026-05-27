import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useDashboardData } from '../hooks/useDashboardData';
import { StatCard } from './StatCard';
import { ItemList } from './ItemList';
import { Modal } from './Modal';


export default function MonsterDashboard() {

  const {
    users,
    products,
    orders,
    loading,
    handleDeleteUser,
    handleDeleteProduct,
    handleDeleteOrder
  } = useDashboardData();


  const windowWidth = useWindowSize();
  const online = useOnlineStatus();


  // =====================================================
  // ESTE COMPONENTE ESTA HECHO INTENCIONALMENTE MAL.
  // OBJETIVO:
  // REFACTORIZARLO.
  // =====================================================

  const [search, setSearch] = React.useState('')
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [darkMode, setDarkMode] = React.useState(false)
  
  const [count, setCount] = React.useState(0)
  const [tab, setTab] = React.useState('users')
  const [message, setMessage] = React.useState('')
  const [filter, setFilter] = React.useState('all')
  const [price, setPrice] = React.useState(0)
  const [showModal, setShowModal] = React.useState(false)
  const [notifications, setNotifications] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const fullName = search + ' User';
  const theme = darkMode ? 'dark' : 'light';

  

  // =====================================================
  // FUNCIONES REPETIDAS
  // =====================================================
  function addNotification(text) {
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        text,
      },
    ])
  }

  // =====================================================
  // CALCULOS PESADOS SIN MEMO
  // =====================================================

const expensiveUsers = React.useMemo(() => {
    return users.map((u) => {
      let total = 0
      for (let i = 0; i < 100000; i++) {
        total += i
      }
      return { ...u, total }
    });
  }, [users]);


const expensiveProducts = React.useMemo(() => {
    return products.map((p) => {
      let total = 0
      for (let i = 0; i < 100000; i++) {
        total += i
      }
      return { ...p, total }
    });
  }, [products]);

  // =====================================================
  // JSX GIGANTE
  // =====================================================

  return (
    <div
      style={{
        background: darkMode ? '#111' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1>Monster Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>

       <button onClick={() => {
          const newCount = count + 1;
          setCount(newCount);
          document.title = newCount;
        }}>
          Count {count}
        </button>
        

        <button onClick={() => setShowModal(!showModal)}>
          Toggle Modal
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setTab('users')}>
          Users
        </button>

        <button onClick={() => setTab('products')}>
          Products
        </button>

        <button onClick={() => setTab('orders')}>
          Orders
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Another input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Window Width: {windowWidth}</p>
        <p>Online: {online ? 'Yes' : 'No'}</p>
        <p>Theme: {theme}</p>
        <p>Full Name: {fullName}</p>
      </div>

      {loading && <p>Loading...</p>}

      {/* ===================================================== */}
      {/* USERS */}
      {/* ===================================================== */}

      {tab === 'users' && (
        <div>
          <h2>Users</h2>

          <ItemList
          items={expensiveUsers.filter((u) =>
            u.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={(user) => (
            <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <p>{user.total}</p>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  addNotification('User selected');
                }}
              >
                Select
              </button>

              <button
                onClick={() => {
                  handleDeleteUser(user.id);
                  addNotification('User deleted');
                }}
              >
                Delete
              </button>
            </div>
          )}
        />

          {selectedUser && (
            <div
              style={{
                border: '2px solid blue',
                padding: '20px',
                marginTop: '20px',
              }}
            >
              <h3>Selected User</h3>
              <p>{selectedUser.name}</p>
              <p>{selectedUser.role}</p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================== */}
      {/* PRODUCTS */}
      {/* ===================================================== */}

      {tab === 'products' && (
        <div>
          <h2>Products</h2>

        <ItemList
          items={expensiveProducts.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={(product) => (
            <div style={{ border: '1px solid green', padding: '10px', marginBottom: '10px' }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.total}</p>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  addNotification('Product selected');
                }}
              >
                Select
              </button>

              <button
                onClick={() => {
                  handleDeleteProduct(product.id);
                  addNotification('Product deleted');
                }}
              >
                Delete
              </button>
            </div>
          )}
        />

          {selectedProduct && (
            <div
              style={{
                border: '2px solid green',
                padding: '20px',
                marginTop: '20px',
              }}
            >
              <h3>Selected Product</h3>
              <p>{selectedProduct.name}</p>
              <p>${selectedProduct.price}</p>
            </div>
          )}
        </div>
      )}

      {/* ===================================================== */}
      {/* MODAL INSIDE A TAB - BAD PRACTICE */}
      {/* ===================================================== */}
      {tab === 'products' && (
        <Modal isOpen={showModal}>
          <h2>Modal</h2>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                addNotification(message);
                setShowModal(false); // Cierra el modal al guardar
              }}
            >
              Save
            </button>

            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    
      {tab === 'orders' && (
        <div>
          <h2>Orders</h2>

<ItemList
          items={orders}
          renderItem={(order) => (
            <div style={{ border: '1px solid orange', padding: '10px', marginBottom: '10px' }}>
              <h3>Order #{order.id}</h3>
              <p>Total: ${order.total}</p>

              <button
                onClick={() => {
                  handleDeleteOrder(order.id);
                  addNotification('Order deleted');
                }}
              >
                Delete
              </button>
            </div>
          )}
        />
        </div>
      )}

      {/* ===================================================== */}
      {/* NOTIFICATIONS */}
      {/* ===================================================== */}

      <div style={{ marginTop: '40px' }}>
        <h2>Notifications</h2>

        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              background: '#222',
              color: '#fff',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            {n.text}
          </div>
        ))}
      </div>

      {/* ===================================================== */}
      {/* MODAL */}
      {/* ===================================================== */}

      {showModal && (
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
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px',
              width: '400px',
            }}
          >
            <h2>Modal</h2>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => {
                  addNotification(message)
                  setShowModal(false)
                }}
              >
                Save
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* JSX REPETIDO */}
      {/* ===================================================== */}

      <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <StatCard title="Total Users" count={users.length} />
        <StatCard title="Total Products" count={products.length} />
        <StatCard title="Total Orders" count={orders.length} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Random Section 1</h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => addNotification('Clicked 1')}>
            Action 1
          </button>

          <button onClick={() => addNotification('Clicked 2')}>
            Action 2
          </button>

          <button onClick={() => addNotification('Clicked 3')}>
            Action 3
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Random Section 2</h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => addNotification('Clicked 4')}>
            Action 4
          </button>

          <button onClick={() => addNotification('Clicked 5')}>
            Action 5
          </button>

          <button onClick={() => addNotification('Clicked 6')}>
            Action 6
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Random Section 3</h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => addNotification('Clicked 7')}>
            Action 7
          </button>

          <button onClick={() => addNotification('Clicked 8')}>
            Action 8
          </button>

          <button onClick={() => addNotification('Clicked 9')}>
            Action 9
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Very Bad Practices</h2>

        <p>
          Este componente mezcla:
        </p>

        <ul>
          <li>UI</li>
          <li>Business logic</li>
          <li>Effects</li>
          <li>Data fetching</li>
          <li>Heavy calculations</li>
          <li>Repeated JSX</li>
          <li>Repeated handlers</li>
          <li>Global responsibilities</li>
        </ul>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Another Massive Section</h2>

        {[1,2,3,4,5,6,7,8].map((item) => (
          <div
            key={item}
            style={{
              border: '1px solid #999',
              padding: '20px',
              marginBottom: '10px',
            }}
          >
            <h3>Card {item}</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <button
              onClick={() => addNotification(`Card ${item}`)}
            >
              Notify
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}