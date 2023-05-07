import React, { createContext, useState, useEffect } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (url) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: new Date().getTime(),
        url,
        title: url,
        status: 'todo',
        timer: null,
      },
    ]);
  };

  const moveToWaiting = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, status: 'waiting', timer: setTimeout(() => moveToTodo(id), 5000) }
          : item
      )
    );
  };

  const moveToTodo = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: 'todo', timer: null } : item
      )
    );
  };

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.timer) {
          clearTimeout(item.timer);
        }
      });
    };
  }, [items]);

  return (
    <ItemContext.Provider value={{ items, addItem, moveToWaiting, moveToTodo }}>
      {children}
    </ItemContext.Provider>
  );
};
