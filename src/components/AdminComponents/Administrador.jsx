import React from 'react';
import { Link } from 'react-router-dom';
import Pedidos from './Pedidos';
import AdmProductos from './AdmProductos';
import Usuarios from './Usuarios';

const Administrador = () => {
  return (
    <div>
      <h1>Administrador</h1>
      <Pedidos />
      <AdmProductos />
      <Usuarios />
      <Link to="/">Volver a la Tienda</Link>

    </div>
  );
};

export default Administrador;