import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { StoreContext } from '../../context/ContextAdm';
import CrearProducto from './CrearProducto';
import ModificarProducto from './ModificarProducto';

const AdmProductos = () => {
  const { productos, setProductos } = useContext(StoreContext);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);
  const [mostrarCrearProducto, setMostrarCrearProducto] = useState(false);

  const handleEliminar = async (id_producto) => {
    if (id_producto) {
      try {
        const response = await fetch(`http://localhost:3000/api/productos/${id_producto}`, { method: 'DELETE' });
        if (response.ok) {
          setProductos((prevProductos) => prevProductos.filter(producto => producto.id_producto !== id_producto));
        } else {
          console.error('Error al eliminar producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    } else {
      console.error('ID de producto no definido');
    }
  };

  const handleModificar = (producto) => {
    setProductoSeleccionado(producto);
    setModoEditar(true);
    setMostrarCrearProducto(false);
  };

  const handleCrearProducto = () => {
    setProductoSeleccionado(null);
    setModoEditar(false);
    setMostrarCrearProducto(true);
  };

  const handleCerrarFormulario = () => {
    setProductoSeleccionado(null);
    setModoEditar(false);
    setMostrarCrearProducto(false);
  };

  const agregarProductoNuevo = (nuevoProducto) => {
    console.log('Agregando nuevo producto:', nuevoProducto);
    setProductos([...productos, nuevoProducto]);
    handleCerrarFormulario(); // Cerrar el formulario después de agregar el producto
  };

  console.log('Productos actuales:', productos); 

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
                <CrearProducto onClose={handleCerrarFormulario} agregarProductoNuevo={agregarProductoNuevo} />
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
