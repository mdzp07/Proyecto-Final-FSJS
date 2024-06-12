import './App.css';
import { Route, Routes } from "react-router-dom";

import Index from './views';
import Productos from './views/Productos';
import Registrar from './views/Registrar';
import Login from './views/Login';
import Perfil from './views/Perfil';
import Compra from './views/Compra';
import Administrador from './components/AdminComponents/Administrador';
import { StoreProvider } from './context/ContextAdm';
import ContextProvider from './context/Context';
import TokenProvider from './context/ContextToken';

function App() {
  return (
    <StoreProvider>
      <TokenProvider>
          <ContextProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/Productos' element={<Productos />} />
          <Route path='/Registrar' element={<Registrar />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Perfil' element={<Perfil />} />
          <Route path='/Compra' element={<Compra />} />
          <Route path='/Administrador' element={<Administrador />} />
        </Routes>
      </div>
      </ContextProvider>
      </TokenProvider>
    </StoreProvider>
  );
}

export default App;
