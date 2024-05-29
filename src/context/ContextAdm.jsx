import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    const fetchProductos = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const productosAdaptados = data.map(producto => ({
          id: producto.id,
          nombre: producto.title,
          descripcion: producto.description,
          precio: producto.price,
          imagen: producto.image,
          stock: producto.rating.count
        }));
        setProductos(productosAdaptados);
    };

    fetchProductos();
  }, []);

  const [usuarios, setUsuarios] = useState([
    { id_usuario: 1, nombre: 'Juanita Perez', correo: 'juanita@gmail.com', direccion: 'Dirección 1', telefono: '987654324' },
    { id_usuario: 2, nombre: 'Andres Sanchez', correo: 'andres@gmail.com', direccion: 'Dirección 2', telefono: '908765421' }
  ]);
  const [pedidos, setPedidos] = useState([
    { id_pedido: 1, estado: 'En proceso', nombre_usuario: 'Juanita Perez', monto_total: 300, detalles: [{ producto: 'Producto 1', cantidad: 2, precio_unitario: 100 }] },
    { id_pedido: 2, estado: 'Completado', nombre_usuario: 'Andres Sanchez', monto_total: 400, detalles: [{ producto: 'Producto 2', cantidad: 2, precio_unitario: 200 }] }
  ]);

  return (
    <StoreContext.Provider value={{ productos, setProductos, usuarios, setUsuarios, pedidos, setPedidos }}>
      {children}
    </StoreContext.Provider>
  );
};