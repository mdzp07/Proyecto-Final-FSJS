import React from 'react';

const DetallesPedido = ({ pedido }) => {
  return (
    <div>
      <h3>Detalles del Pedido {pedido.id_pedido}</h3>
      <ul>
        {pedido.detalles.map((detalle, index) => (
          <li key={index}>
            Producto: {detalle.producto}, Cantidad: {detalle.cantidad}, Precio Unitario: ${detalle.precio_unitario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetallesPedido;