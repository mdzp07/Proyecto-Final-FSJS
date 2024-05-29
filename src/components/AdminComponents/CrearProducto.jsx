import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/ContextAdm';

const CrearProducto = () => {
  const { productos, setProductos } = useContext(StoreContext);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    };
    setProductos([...productos, nuevoProducto]);
  };

  return (
    <div>
      <h3>Crear Nuevo Producto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div>
          <label>Precio Unitario:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Imagen (URL):</label>
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;
