import React from 'react'
import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({children}) => {

    const [car, setCar] = useState([]);
    const [token, setToken] = useState([]);

  return (
    <Context.Provider value={{ car, setCar, token, setToken }}>
        {children}
    </Context.Provider>
  );
}
export default ContextProvider;