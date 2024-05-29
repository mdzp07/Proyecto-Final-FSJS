import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';
import DetallesProducto from './DetallesProducto';
import CrearProducto from './CrearProducto';
import ModificarProducto from './ModificarProducto';

const AdmProductos = () => {
  const { productos, setProductos } = useContext(StoreContext);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);

  const handleEliminar = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const handleModificar = (producto) => {
    setProductoSeleccionado(producto);
    setModoEditar(true);
  };

  return (
    <div>
      <h2>Productos</h2>
      <button onClick={() => { setProductoSeleccionado({}); setModoEditar(false); }}>Crear Producto</button>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <span onClick={() => setProductoSeleccionado(producto)}>
              {producto.nombre}
            </span>
            <span> - Stock: {producto.stock} - Precio: ${producto.precio}</span>
            <button onClick={() => handleModificar(producto)}>Modificar</button>
            <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {productoSeleccionado && productoSeleccionado.id && !modoEditar && (
        <DetallesProducto producto={productoSeleccionado} />
      )}
      {productoSeleccionado && modoEditar && (
        <ModificarProducto producto={productoSeleccionado} setModoEditar={setModoEditar} />
      )}
      {productoSeleccionado && !productoSeleccionado.id && !modoEditar && (
        <CrearProducto />
      )}
    </div>
  );
};

export default AdmProductos;