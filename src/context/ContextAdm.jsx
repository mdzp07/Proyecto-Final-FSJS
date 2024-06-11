import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data));

        fetch('http://localhost:3000/api/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data));
    }, []);

    return (
        <StoreContext.Provider value={{ productos, setProductos, usuarios, setUsuarios }}>
            {children}
        </StoreContext.Provider>
    );
};