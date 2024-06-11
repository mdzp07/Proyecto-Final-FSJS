import React from 'react';
import { Card } from 'react-bootstrap';

const DetallesProducto = ({ producto }) => {
  return (
    <Card>
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>
        <Card.Text>Precio: ${producto.precio}</Card.Text>
        <Card.Text>Stock: {producto.stock}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DetallesProducto;