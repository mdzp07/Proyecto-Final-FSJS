import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Carrito = () => {

  // Context
  const { car, setCar } = useContext(Context);
  
  // Ordeno mi Context tipo arreglo de objetos alfabeticamente
  car.sort((a, b) => {
    if (a.nombre < b.nombre) {
      return -1;
    }
    if (a.nombre > b.nombre) {
      return 1;
    }
    return 0;
  });

  // Creo un conjunto de datos Set()
  const products = new Set();

  // Render es un objeto local que se usará para renderizar
  const render = [];

  // Agregar elementos al conjunto de datos
  car.forEach((i) => {
    const { nombre } = i;
    if (!products.has(nombre)) {
      products.add(nombre);
      render.push(i);
      i.sum = car.filter((i) => i.nombre === nombre).length;
    }
  });

  // Agregar o quitar productos
  const add = (bolean, name, object) => {
    if (bolean) setCar((currentObj) => [...currentObj, object]);
    else
      setCar((currentObj) => {
        let deleted = false;
        return currentObj.filter((i) => {
          if (!deleted && i.nombre === name) { // Aquí cambié i.title a i.nombre
            deleted = true;
            return false;
          }
          return true;
        });
      });
  };

  // Calcular total
  const Total = () => {
    let sum = 0;
    for (const i of car)
      sum = sum + i.precio;

    return sum.toLocaleString("de-DE");
  };

  return (
    <>
      {car.length == 0 ? (<div className='mensaje-carro-vacio'><p>¡Ops! Esto parece estar vacío</p></div>) : (<section>
        <p>Detalle del pedido:</p>
        {render.map((i, x) => (
          <div className='card-carro' key={i.nombre}>
            <div className='caja-carro-img'>
              <img className='card-carro-img' src={i.imagen} alt={i.nombre} />
              <p>
                {i.nombre}
              </p>
            </div>
            <div className='caja-precio-comando'>
              <div className='carro-caja-precio'>
                  <p>${(i.sum * i.precio).toLocaleString("de-DE")}</p>
              </div>
              <div className='card-carro-comandos'>
                <button
                  onClick={() => add(false, i.nombre, i)}
                >
                  -
                </button>
                <h5>{i.sum}</h5>
                <button
                  onClick={() => add(true, i.nombre, i)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <p>Total: ${Total()}</p>
        <button>Ir a pagar</button>
        <button>Hacer el pedido</button>
      </section>)}
    </>
  );
}

export default Carrito;
