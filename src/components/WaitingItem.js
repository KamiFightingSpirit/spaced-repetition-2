import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function WaitingItem({ item, onDone }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const timeRemaining = (item.dueDate - now) / 1000; //in seconds
      var d = Math.floor(timeRemaining / (3600*24));
      var h = Math.floor(timeRemaining % (3600*24) / 3600);
      var m = Math.floor(timeRemaining % 3600 / 60);
      var s = Math.floor(timeRemaining % 60);
      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins ") : "";
      var sDisplay = s > 0 && h < 1 && d < 1 ? s + (s == 1 ? " sec" : " secs") : "";
      setTimeLeft(`${dDisplay + hDisplay + mDisplay + sDisplay}`);
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
          <Button onClick={onDone} className="float-right">{item.status === 'todo' ? 'Done' : 'Move to To Do'}</Button>
        </span>
      </div>
    </div>
  );
}

export default WaitingItem;
