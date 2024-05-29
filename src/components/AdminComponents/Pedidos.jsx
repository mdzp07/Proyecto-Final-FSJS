import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import DetallesPedido from './DetallesPedido';

const Pedidos = () => {
  const { pedidos, setPedidos } = useContext(StoreContext);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const handleEstadoChange = (id_pedido, nuevoEstado) => {
    setPedidos(pedidos.map(pedido =>
      pedido.id_pedido === id_pedido ? { ...pedido, estado: nuevoEstado } : pedido
    ));
  };

  const handleVerDetalles = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id_pedido}>
            {pedido.id_pedido} - {pedido.nombre_usuario}
            <select
              value={pedido.estado}
              onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
            >
              <option value="En proceso">En proceso</option>
              <option value="Completado">Completado</option>
              <option value="En espera">En espera</option>
            </select>
            <span> - ${pedido.monto_total}</span>
            <button onClick={() => handleVerDetalles(pedido)}>Ver Detalles</button>
          </li>
        ))}
      </ul>
      {pedidoSeleccionado && (
        <DetallesPedido pedido={pedidoSeleccionado} />
      )}
    </div>
  );
};

export default Pedidos;
