import React, { useState, useContext } from 'react';
import { ItemContext } from './ItemContext';
import { Form, FormControl, Button } from 'react-bootstrap';
import './EnterNewItem.css';

function EnterNewItem() {
  const { addItem } = useContext(ItemContext);
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(url);
    setUrl('');
  };

  return (
    <Form onSubmit={handleSubmit} className="enter-new-item">
      <FormControl
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="mr-2"
      />
      <Button type="submit" variant="primary">Add URL</Button>
    </Form>
  );
}

export default EnterNewItem;
