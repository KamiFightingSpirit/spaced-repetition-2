import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ItemProvider } from './components/ItemContext';
import EnterNewItem from './components/EnterNewItem';
import ToDo from './components/ToDo';
import Waiting from './components/Waiting';
import './App.css';

function App() {
  return (
    <ItemProvider>
      <Container className="App">
        <EnterNewItem />
        <Row className="content">
          <Col sm={12} md={6}>
            <ToDo />
          </Col>
          <Col sm={12} md={6}>
            <Waiting />
          </Col>
        </Row>
      </Container>
    </ItemProvider>
  );
}

export default App;
