import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/ContextAdm';

const ModificarProducto = ({ producto, setModoEditar }) => {
  const { productos, setProductos } = useContext(StoreContext);
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const handleGuardar = () => {
    const productoModificado = { ...producto, nombre, precio, stock };
    setProductos(productos.map(p => (p.id === producto.id ? productoModificado : p)));
    setModoEditar(false);
  };

  return (
    <div>
      <h3>Modificar Producto</h3>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Precio:
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </label>
      <label>
        Stock:
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </label>
      <button onClick={handleGuardar}>Guardar</button>
      <button onClick={() => setModoEditar(false)}>Cancelar</button>
    </div>
  );
};

export default ModificarProducto;