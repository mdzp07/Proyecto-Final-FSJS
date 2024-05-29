import React from 'react';

const DetallesProducto = ({ producto }) => {
  return (
    <div>
      <h3>Detalles del Producto {producto.nombre}</h3>
      <p>Descripción: {producto.descripcion}</p>
      <p>Precio Unitario: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>Imagen: <img src={producto.imagen} alt={producto.nombre} /></p>
    </div>
  );
};

export default DetallesProducto;
