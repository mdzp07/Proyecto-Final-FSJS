import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('https://proyecto-final-fsjs.onrender.com/api/productos')
            .then(response => response.json())
            .then(data => {
                console.log('Productos obtenidos:', data);
                setProductos(data);
            })
            .catch(error => console.error('Error al obtener productos:', error));

        fetch('https://proyecto-final-fsjs.onrender.com/api/usuarios')
            .then(response => response.json())
            .then(data => {
                console.log('Usuarios obtenidos:', data);
                setUsuarios(data);
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);

    return (
        <StoreContext.Provider value={{ productos, setProductos, usuarios, setUsuarios }}>
            {children}
        </StoreContext.Provider>
    );
};
