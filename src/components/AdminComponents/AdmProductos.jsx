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
  const [mostrarCrearProducto, setMostrarCrearProducto] = useState(false);

  const handleEliminar = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const handleModificar = (producto) => {
    setProductoSeleccionado(producto);
    setModoEditar(true);
    setMostrarCrearProducto(false); // Cerrar el formulario de creación al abrir el de modificación
  };

  const handleCrearProducto = () => {
    setProductoSeleccionado(null);
    setModoEditar(false);
    setMostrarCrearProducto(true); // Abrir el formulario de creación al hacer clic en "Crear Producto"
  };

  const handleCerrarFormulario = () => {
    setProductoSeleccionado(null);
    setModoEditar(false);
    setMostrarCrearProducto(false);
  };

  return (
    <Container fluid>
      <Row className="my-4">
        <Col>
          <Button variant="primary" onClick={handleCrearProducto}>
            Crear Producto
          </Button>
        </Col>
      </Row>
      {mostrarCrearProducto && (
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Card className="mt-4">
              <Card.Body>
                <CrearProducto onClose={handleCerrarFormulario} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
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
                <tr key={producto.id}>
                  <td onClick={() => setProductoSeleccionado(producto)} style={{ cursor: 'pointer' }}>
                    {producto.nombre}
                  </td>
                  <td>{producto.stock}</td>
                  <td>${producto.precio}</td>
                  <td>
                    <div className="d-flex">
                      <Button variant="warning" size="sm" className="mr-2" onClick={() => handleModificar(producto)}>Modificar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleEliminar(producto.id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {productoSeleccionado && modoEditar && (
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Card className="mt-4">
              <Card.Body>
                <ModificarProducto producto={productoSeleccionado} setModoEditar={setModoEditar} onClose={handleCerrarFormulario} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdmProductos;
