import React, { useContext } from 'react';
import { ItemContext } from './ItemContext';
import WaitingItem from './WaitingItem';
import { Card, ListGroup } from 'react-bootstrap';
import './Waiting.css';

function Waiting() {
  const { items, moveToTodo } = useContext(ItemContext);
  const waitingItems = items.filter((item) => item.status === 'waiting');

  return (
    <div className="Waiting">
      <Card className="waiting-card">
        <Card.Header>
          <h2>Waiting</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {waitingItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <WaitingItem
                item={item}
                onDone={() => moveToTodo(item.id)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}

export default Waiting;
