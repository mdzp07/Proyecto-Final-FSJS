import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Nav = () => {
  return (
    <AppBar color="secondary" position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tienda
        </Typography>
        <Button color="inherit" component={Link} to="/Productos">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/Administrador">
          Administrar tienda
        </Button>
        <Button color="inherit" component={Link} to="/Registrar">
          Regístrate
        </Button>
        <IconButton color="inherit" component={Link} to="/Login">
          <LoginIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/Perfil">
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/Compra">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
