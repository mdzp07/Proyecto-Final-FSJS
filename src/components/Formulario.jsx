import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, correo, clave: contrasena })});

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado:', data);
        alert("¡Usuario guardado exitosamente!")
        setNombre('');
        setCorreo('');
        setContrasena('');
      } else {
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container contenedor-registro">
    <form className='contenedor-formulario' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      </div>
      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Correo</label>
        <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
      </div>
      <div className="mb-3">
        <label htmlFor="contrasena" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" />
      </div>
      <button type="submit" className="btn btn-primary">registrar usuario</button>
    </form>
  </div>
  );
};

export default Formulario;