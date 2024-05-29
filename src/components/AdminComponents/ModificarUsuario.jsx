import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';

const ModificarUsuario = ({ usuario, setModoEditar }) => {
  const { usuarios, setUsuarios } = useContext(StoreContext);
  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);
  const [direccion, setDireccion] = useState(usuario.direccion);
  const [telefono, setTelefono] = useState(usuario.telefono);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioModificado = {
      ...usuario,
      nombre,
      correo,
      direccion,
      telefono
    };
    setUsuarios(usuarios.map(u => u.id_usuario === usuario.id_usuario ? usuarioModificado : u));
    setModoEditar(false);
  };

  return (
    <div>
      <h3>Modificar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <button type="submit">Modificar Usuario</button>
      </form>
    </div>
  );
};

export default ModificarUsuario;
