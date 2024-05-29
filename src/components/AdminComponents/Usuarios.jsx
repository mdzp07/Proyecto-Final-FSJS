import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import DetallesUsuario from './DetallesUsuario';
import ModificarUsuario from './ModificarUsuario';

const Usuarios = () => {
  const { usuarios, setUsuarios } = useContext(StoreContext);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);

  const handleEliminar = (id_usuario) => {
    setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id_usuario));
  };

  const handleModificar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModoEditar(true);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id_usuario}>
            <span onClick={() => { setUsuarioSeleccionado(usuario); setModoEditar(false); }}>
              {usuario.nombre}
            </span> - {usuario.correo}
            <button onClick={() => handleModificar(usuario)}>Modificar</button>
            <button onClick={() => handleEliminar(usuario.id_usuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {usuarioSeleccionado && !modoEditar && <DetallesUsuario usuario={usuarioSeleccionado} />}
      {usuarioSeleccionado && modoEditar && <ModificarUsuario usuario={usuarioSeleccionado} setModoEditar={setModoEditar} />}
    </div>
  );
};

export default Usuarios;
