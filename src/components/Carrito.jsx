import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Container } from '@mui/material';

const Carrito = () => {
  // Contexto
  const { car, setCar } = useContext(Context);

  // Ordenar el carrito alfabéticamente
  car.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Crear un conjunto de productos
  const products = new Set();

  // Render es un arreglo local que se usará para renderizar
  const render = [];

  // Agregar elementos al conjunto de productos
  car.forEach((i) => {
    const { nombre } = i;
    if (!products.has(nombre)) {
      products.add(nombre);
      render.push(i);
      i.sum = car.filter((item) => item.nombre === nombre).length;
    }
  });

  // Funciones para sumar, restar y eliminar productos
  const sumar = (item) => {
    setCar((currentObj) => [...currentObj, item]);
  };

  const restar = (item) => {
    setCar((currentObj) => {
      let deleted = false;
      return currentObj.filter((i) => {
        if (!deleted && i.nombre === item.nombre) {
          deleted = true;
          return false;
        }
        return true;
      });
    });
  };

  const eliminar = (item) => {
    setCar((currentObj) => currentObj.filter((i) => i.nombre !== item.nombre));
  };

  // Calcular total
  const Total = () => {
    let sum = 0;
    for (const i of car) {
      sum += i.precio;
    }
    return sum.toLocaleString("de-DE");
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {car.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <Typography variant="h4">¡Ops! Esto parece estar vacío</Typography>
        </Box>
      ) : (
        <Box sx={{ padding: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">Detalle del pedido:</Typography>
          <Grid container spacing={2} justifyContent="center">
            {render.map((i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i.nombre}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={i.imagen}
                    alt={i.nombre}
                    style={{ objectFit: 'contain', margin: 'auto' }}
                  />
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {i.nombre}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      ${(i.sum * i.precio).toLocaleString("de-DE")}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => sumar(i)}>+</Button>
                    <Typography variant="h6" sx={{ margin: '0 8px' }}>{i.sum}</Typography>
                    <Button variant="contained" color="primary" onClick={() => restar(i)}>-</Button>
                    <Button variant="contained" color="secondary" onClick={() => eliminar(i)}>Eliminar</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ marginTop: 2 }}>Total: ${Total()}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Carrito;

