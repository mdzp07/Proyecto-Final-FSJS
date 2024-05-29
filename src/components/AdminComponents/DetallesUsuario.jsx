import React from 'react';

const DetallesUsuario = ({ usuario }) => {
  return (
    <div>
      <h3>Detalles del Usuario {usuario.nombre}</h3>
      <p>Correo Electrónico: {usuario.correo}</p>
      <p>Dirección: {usuario.direccion}</p>
      <p>Teléfono: {usuario.telefono}</p>
    </div>
  );
};

export default DetallesUsuario;