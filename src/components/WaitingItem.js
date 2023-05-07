import React from 'react';

function WaitingItem({ item, onDone }) {
  return (
    <div className="WaitingItem">
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
      <button onClick={onDone}>{item.status === 'waiting' ? 'Reset' : 'Done'}</button>
    </div>
  );
}

export default WaitingItem;
