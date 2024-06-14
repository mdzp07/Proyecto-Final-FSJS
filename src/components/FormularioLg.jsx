import React, { useState, useContext } from 'react';
import {TokenContext} from '../context/ContextToken';

const FormularioLg = () => {

  const { token, setToken } = useContext(TokenContext);
  
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(correo, contrasena);  
      const response = await fetch('http://localhost:3000/autenticar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, clave: contrasena })});

      if (response.ok) {
        const data = await response.json();
        setToken(data);
        console.log('Usuario registrado:', data);
        if(data){
            alert("¡Usuario autenticado exitosamente!")
            setCorreo('');
            setContrasena('');
        }else{
            alert("¡Credenciales invalidas!") 
        }
      } else {
        console.error('Error al ingresar usuario');
        alert("¡Error al autenticar usuario!")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
      <div className="container contenedor-registro">
        <form className='contenedor-formulario' onSubmit={handleSubmit}>
        <h1>Inicia sesión</h1>
        <br />
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );

}

export default FormularioLg;