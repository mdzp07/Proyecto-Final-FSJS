import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import { Form, Button, Container } from 'react-bootstrap';

const CrearProducto = () => {
  const { productos, setProductos } = useContext(StoreContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    };
    setProductos([...productos, nuevoProducto]);
  };

  return (
    <Container className="mt-3">
      <h3>Crear Nuevo Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control as="textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="precio">
          <Form.Label>Precio Unitario:</Form.Label>
          <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock:</Form.Label>
          <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="imagen">
          <Form.Label>Imagen (URL):</Form.Label>
          <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Crear Producto</Button>
      </Form>
    </Container>
  );
};

export default CrearProducto;