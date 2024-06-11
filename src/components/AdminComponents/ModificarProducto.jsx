import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import { Form, Button, Container } from 'react-bootstrap';

const ModificarProducto = ({ producto, setModoEditar }) => {
    const { productos, setProductos } = useContext(StoreContext);
    const [nombre, setNombre] = useState(producto.nombre);
    const [descripcion, setDescripcion] = useState(producto.descripcion);
    const [precio, setPrecio] = useState(producto.precio);
    const [stock, setStock] = useState(producto.stock);
    const [imagen, setImagen] = useState(producto.imagen);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productoModificado = { nombre, descripcion, precio, stock, imagen };
        
        const response = await fetch(`http://localhost:3000/api/productos/${producto.id_producto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoModificado),
        });
        
        const data = await response.json();
        setProductos(productos.map(p => p.id_producto === producto.id_producto ? data : p));
        setModoEditar(false);
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
                <Button variant="primary" type="submit">Modificar Producto</Button>
            </Form>
        </Container>
    );
};

export default ModificarProducto;