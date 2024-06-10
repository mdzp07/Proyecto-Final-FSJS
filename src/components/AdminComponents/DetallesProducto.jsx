import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DetallesProducto = ({ producto }) => {
  return (
    <Card className="mt-3">
      <Row noGutters>
        <Col md={4}>
          <Card.Img src={producto.imagen} alt={producto.nombre} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>Detalles del Producto {producto.nombre}</Card.Title>
            <Card.Text>Descripción: {producto.descripcion}</Card.Text>
            <Card.Text>Precio Unitario: ${producto.precio}</Card.Text>
            <Card.Text>Stock: {producto.stock}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetallesProducto;
