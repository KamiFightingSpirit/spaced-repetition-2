import React, { useState, createContext, useEffect } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const intervals = [
      360 * 10000, 360 * 10000,
      24 * 360 * 10000, 24 * 360 * 10000,
      3 * 24 * 360 * 10000, 3 * 24 * 360 * 10000,
      7 * 24 * 360 * 10000, 7 * 24 * 360 * 10000,
      30 * 24 * 360 * 10000, 30 * 24 * 360 * 10000
    ]; // Time intervals in milliseconds

  const addItem = (url) => {
    setItems([
      ...items,
      {
        id: Date.now(),
        url,
        status: 'todo',
        intervalIndex: 0,
        dueDate: null,
      },
    ]);
  };

  const moveToWaiting = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const newDueDate = new Date(Date.now() + intervals[item.intervalIndex]);
        return {
          ...item,
          status: item.status === 'waiting' ? 'todo' : 'waiting',
          intervalIndex: item.intervalIndex + 1,
          dueDate: newDueDate,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const moveToTodo = (itemId) => {
    console.log("here")
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: 'todo',
          intervalIndex: item.intervalIndex + 1,
          dueDate: null,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      items.forEach((item) => {
        if (item.status === 'waiting' && item.dueDate <= Date.now()) {
          moveToTodo(item.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <ItemContext.Provider value={{ items, addItem, moveToWaiting }}>
      {children}
    </ItemContext.Provider>
  );
};
