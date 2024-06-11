import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const ModificarProducto = ({ producto, setModoEditar, onClose }) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const [imagen, setImagen] = useState(producto.imagen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productoActualizado = {
      ...producto,
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    };
    // Lógica para enviar el producto actualizado al backend
    setModoEditar(false); // Cerrar el formulario al enviar el producto actualizado
    onClose(); // Cerrar el formulario al enviar el producto actualizado
  };

  return (
    <Container className="mt-3">
      <h3>Modificar Producto</h3>
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
        <Button variant="primary" type="submit">Guardar Cambios</Button>
        <Button variant="secondary" onClick={() => { setModoEditar(false); onClose(); }} className="ml-2">Cerrar</Button>
      </Form>
    </Container>
  );
};

export default ModificarProducto;