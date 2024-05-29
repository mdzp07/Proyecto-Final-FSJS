import React from 'react'
import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({children}) => {

    const [car, setCar] = useState([]);

  return (
    <Context.Provider value={{ car, setCar }}>
        {children}
    </Context.Provider>
  );
}
export default ContextProvider;