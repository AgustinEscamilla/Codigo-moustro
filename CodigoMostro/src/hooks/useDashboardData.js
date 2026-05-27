import React from 'react';

export function useDashboardData() {
  const [users, setUsers] = React.useState([])
  const [products, setProducts] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Sergio', role: 'Admin' },
        { id: 2, name: 'Ana', role: 'Developer' },
        { id: 3, name: 'Luis', role: 'Designer' },
      ])

      setProducts([
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Mouse', price: 50 },
        { id: 3, name: 'Keyboard', price: 120 },
      ])

      setOrders([
        { id: 1, total: 300 },
        { id: 2, total: 900 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  // 2. Tus funciones de borrado
  function handleDeleteUser(id) {
    const updated = users.filter((u) => u.id !== id)
    setUsers(updated)
  }

  function handleDeleteProduct(id) {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
  }

  function handleDeleteOrder(id) {
    const updated = orders.filter((o) => o.id !== id)
    setOrders(updated)
  }

  return {
    users,
    products,
    orders,
    loading,
    handleDeleteUser,
    handleDeleteProduct,
    handleDeleteOrder
  };
}