import React, { useContext } from 'react';
import { ItemContext } from './ItemContext';
import WaitingItem from './WaitingItem';
import { Card, ListGroup } from 'react-bootstrap';
import './ToDo.css';

function ToDo() {
  const { items, moveToWaiting } = useContext(ItemContext);
  const todoItems = items.filter((item) => item.status === 'todo');

  const renderSubcategory = (title, items) => {
    return (
      <div className="subcategory" key={title}>
        <h3>{title}</h3>
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item key={item.id}>
              <WaitingItem
                item={item}
                onDone={() => moveToWaiting(item.id)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };

  const subcategories = [
    { title: '1 Hour', items: todoItems.filter((item) => item.intervalIndex === 0) },
    { title: '24 Hours', items: todoItems.filter((item) => item.intervalIndex === 2) },
    { title: '3 Days', items: todoItems.filter((item) => item.intervalIndex === 4) },
    { title: '1 Week', items: todoItems.filter((item) => item.intervalIndex === 6) },
    { title: '1 Month', items: todoItems.filter((item) => item.intervalIndex === 8) },
  ];

  return (
    <div className="ToDo">
      <Card className="todo-card">
        <Card.Header>
          <h2>To Do</h2>
        </Card.Header>
        <Card.Body>
          {subcategories.map((subcategory) => (
            renderSubcategory(subcategory.title, subcategory.items)
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ToDo;
