import React, { useContext } from 'react';
import { ItemContext } from './ItemContext';
import WaitingItem from './WaitingItem';
import { Card, ListGroup } from 'react-bootstrap';
import './Waiting.css';

function Waiting() {
  const { items, moveToWaiting } = useContext(ItemContext);
  const waitingItems = items.filter((item) => item.status === 'waiting');

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
    { title: '1 Hour', items: waitingItems.filter((item) => item.intervalIndex === 0) },
    { title: '24 Hours', items: waitingItems.filter((item) => item.intervalIndex === 1) },
    { title: '3 Days', items: waitingItems.filter((item) => item.intervalIndex === 2) },
    { title: '1 Week', items: waitingItems.filter((item) => item.intervalIndex === 3) },
    { title: '1 Month', items: waitingItems.filter((item) => item.intervalIndex === 4) },
  ];

  return (
    <div className="Waiting">
      <Card className="waiting-card">
        <Card.Header>
          <h2>Waiting</h2>
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

export default Waiting;
