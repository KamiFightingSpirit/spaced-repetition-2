import React, { useContext } from 'react';
import { ItemContext } from './ItemContext';
import WaitingItem from './WaitingItem';
import { Card, ListGroup } from 'react-bootstrap';
import './ToDo.css';

function ToDo() {
  const { items, moveToWaiting } = useContext(ItemContext);
  const todoItems = items.filter((item) => item.status === 'todo');

  return (
    <div className="ToDo">
      <Card className="todo-card">
        <Card.Header>
          <h2>To Do</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {todoItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <WaitingItem
                item={item}
                onDone={() => moveToWaiting(item.id)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}

export default ToDo;
