import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './WaitingItem.css';

function WaitingItem({ item, onDone }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const timeRemaining = item.dueDate - now;
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    if (item.status === 'waiting') {
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft('');
    }
  }, [item]);

  return (
    <div className="waiting-item">
      <div className="name">
        <strong>Name: </strong><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
      </div>
      <div className="details">
        <span className="time-left">
          {item.status === 'waiting' && <span><strong>Time left: </strong> {timeLeft}</span>}
        </span>
        <span className="move-button">
          <Button onClick={onDone} className="float-right">{item.status === 'todo' ? 'Done' : 'Move to ToDo'}</Button>
        </span>
      </div>
    </div>
  );
}

export default WaitingItem;
