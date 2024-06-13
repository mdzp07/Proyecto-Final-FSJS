import React from 'react';
import { Link } from 'react-router-dom';
import AdmProductos from './AdmProductos';
import Usuarios from './Usuarios';
import { Container, Row, Col } from 'react-bootstrap';

const Administrador = () => {
  const [seccionMostrada, setSeccionMostrada] = React.useState('');

  return (
    <Container fluid className="d-flex">
      <Row className="bg-light text-dark" style={{ width: '20%', height: '100vh' }}>
        <Col className="d-flex flex-column justify-content-center">
          <NavigationButton seccion="Productos" setSeccionMostrada={setSeccionMostrada} />
          <NavigationButton seccion="Usuarios" setSeccionMostrada={setSeccionMostrada} />
          <Link to="/" className="btn btn-light btn-block">Volver a la Tienda</Link>
        </Col>
      </Row>
      <Row style={{ width: '80%' }}>
        <Col>
          {seccionMostrada === 'Productos' && <AdmProductos />}
          {seccionMostrada === 'Usuarios' && <Usuarios />}
        </Col>
      </Row>
    </Container>
  );
};

const NavigationButton = ({ seccion, setSeccionMostrada }) => {
  return (
    <button className="btn btn-light btn-block mb-3" onClick={() => setSeccionMostrada(seccion)}>{seccion}</button>
  );
};

export default Administrador;