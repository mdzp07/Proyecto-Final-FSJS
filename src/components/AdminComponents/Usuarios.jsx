import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { StoreContext } from '../../context/ContextAdm';
import DetallesUsuario from './DetallesUsuario';
import ModificarUsuario from './ModificarUsuario';

const Usuarios = () => {
  const { usuarios, setUsuarios } = useContext(StoreContext);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, [setUsuarios]);

  const handleEliminar = async (id_usuario) => {
    try {
      await fetch(`http://localhost:3000/api/usuarios/${id_usuario}`, {
        method: 'DELETE',
      });
      setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id_usuario));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleModificar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModoEditar(true);
  };

  return (
    <Container fluid>
      <Row className="my-4">
        <Col>
          <h2>Usuarios</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card>
            <Card.Body>
              <ul>
                {usuarios.map(usuario => (
                  <li key={usuario.id_usuario} className="d-flex align-items-center justify-content-between mb-3">
                    <div onClick={() => { setUsuarioSeleccionado(usuario); setModoEditar(false); }}>
                      <span>{usuario.nombre}</span> - {usuario.correo}
                    </div>
                    <div>
                      <Button variant="warning" size="sm" className="mr-2" onClick={() => handleModificar(usuario)}>Modificar</Button>
                      <Button variant="danger" size="sm" onClick={() => handleEliminar(usuario.id_usuario)}>Eliminar</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {usuarioSeleccionado && !modoEditar && (
            <Card className="mt-4">
              <Card.Body>
                <DetallesUsuario usuario={usuarioSeleccionado} />
              </Card.Body>
            </Card>
          )}
          {usuarioSeleccionado && modoEditar && (
            <Card className="mt-4">
              <Card.Body>
                <ModificarUsuario usuario={usuarioSeleccionado} setModoEditar={setModoEditar} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Usuarios;