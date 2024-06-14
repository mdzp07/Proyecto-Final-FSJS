import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { TokenContext } from '../../context/ContextToken';
import { StoreContext } from '../../context/ContextAdm';


const CrearProducto = ({ onClose }) => {

  const { token } = useContext(TokenContext);
  const { setProductos } = useContext(StoreContext);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if(!token){
      alert("¡Debe ingresar credenciales registradas para poder cargar un producto!")
    }
    if(token){
      try {  
        const response = await fetch('http://localhost:3000/verificacion', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }});
  
        if (response.ok) {
          try{
            const resp = await fetch('http://localhost:3000/api/productos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nombre,
                descripcion,
                precio,
                stock,
                imagen})});

              if (resp.ok) {
                  const nuevoProducto = await resp.json();
                  setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
                  alert("¡Producto registrado con éxito!");
                  }
              else
                alert("¡Error al registar producto!")
            
             }catch (error){
            console.error('Error:', error);
          }

        }
      }catch (error){
        console.error('Error:', error);
      }
    }
    onClose();
  }
    

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
        <Button variant="secondary" onClick={onClose} className="ml-2">Cerrar</Button>
      </Form>
    </Container>
  );
};

export default CrearProducto;