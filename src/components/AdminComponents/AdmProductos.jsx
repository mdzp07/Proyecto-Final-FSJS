import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { StoreContext } from '../../context/ContextAdm';
import DetallesProducto from './DetallesProducto';
import CrearProducto from './CrearProducto';
import ModificarProducto from './ModificarProducto';

const AdmProductos = () => {
    const { productos, setProductos } = useContext(StoreContext);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [modoEditar, setModoEditar] = useState(false);

    const handleEliminar = async (id) => {
        await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' });
        setProductos(productos.filter(producto => producto.id_producto !== id));
    };

    const handleModificar = (producto) => {
        setProductoSeleccionado(producto);
        setModoEditar(true);
    };

    return (
        <Container fluid>
            <Row className="my-4">
                <Col>
                    <Button variant="primary" onClick={() => { setProductoSeleccionado({}); setModoEditar(false); }}>
                        Crear Producto
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Precio Unitario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                <tr key={producto.id_producto}>
                                    <td onClick={() => setProductoSeleccionado(producto)} style={{ cursor: 'pointer' }}>
                                        {producto.nombre}
                                    </td>
                                    <td>{producto.stock}</td>
                                    <td>${producto.precio}</td>
                                    <td>
                                        <div className="d-flex">
                                            <Button variant="warning" size="sm" className="mr-2" onClick={() => handleModificar(producto)}>Modificar</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleEliminar(producto.id_producto)}>Eliminar</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    {productoSeleccionado && productoSeleccionado.id_producto && !modoEditar && (
                        <Card className="mt-4">
                            <Card.Body>
                                <DetallesProducto producto={productoSeleccionado} />
                            </Card.Body>
                        </Card>
                    )}
                    {productoSeleccionado && modoEditar && (
                        <Card className="mt-4">
                            <Card.Body>
                                <ModificarProducto producto={productoSeleccionado} setModoEditar={setModoEditar} />
                            </Card.Body>
                        </Card>
                    )}
                    {productoSeleccionado && !productoSeleccionado.id_producto && !modoEditar && (
                        <Card className="mt-4">
                            <Card.Body>
                                <CrearProducto />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AdmProductos;