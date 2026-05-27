import { useState, useMemo } from 'react';

export function useDashboardState(users, products) {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState('users');
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fullName = search + ' User';
  const theme = darkMode ? 'dark' : 'light';

  function addNotification(text) {
    setNotifications([...notifications, { id: Date.now(), text }]);
  }

  const expensiveUsers = useMemo(() => {
    return users.map((u) => {
      let total = 0;
      for (let i = 0; i < 100000; i++) total += i;
      return { ...u, total };
    });
  }, [users]);

  const expensiveProducts = useMemo(() => {
    return products.map((p) => {
      let total = 0;
      for (let i = 0; i < 100000; i++) total += i;
      return { ...p, total };
    });
  }, [products]);

  return {
    search, setSearch, selectedUser, setSelectedUser, selectedProduct, setSelectedProduct,
    darkMode, setDarkMode, count, setCount, tab, setTab, message, setMessage,
    filter, setFilter, price, setPrice, showModal, setShowModal, notifications, 
    inputValue, setInputValue, fullName, theme, addNotification, expensiveUsers, expensiveProducts
  };
}