import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import { Form, Button, Container } from 'react-bootstrap';

const ModificarProducto = ({ producto, setModoEditar }) => {
  const { productos, setProductos } = useContext(StoreContext);
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const handleGuardar = () => {
    const productoModificado = { ...producto, nombre, precio, stock };
    setProductos(productos.map(p => (p.id === producto.id ? productoModificado : p)));
    setModoEditar(false);
  };

  return (
    <Container className="mt-3">
      <h3>Modificar Producto</h3>
      <Form>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="precio">
          <Form.Label>Precio:</Form.Label>
          <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock:</Form.Label>
          <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </Form.Group>
        <Button variant="success" onClick={handleGuardar}>Guardar</Button>
        <Button variant="secondary" onClick={() => setModoEditar(false)} className="ml-2">Cancelar</Button>
      </Form>
    </Container>
  );
};

export default ModificarProducto;