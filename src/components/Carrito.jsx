import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Carrito = () => {


  //Context
  const { car, setCar } = useContext(Context);
  console.log(car)

  // Ordeno mi Context tipo arreglo de objetos alfabeticamente
  car.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  //Creo un conjunto de datos Set()
  const products = new Set();

  //Render es un objeto local que se usará para renderizar
  const render = [];

  //Agregar elementos al conjunto de datos
  car.forEach((i) => {
    const { title } = i;
    if (!products.has(title)) {
      products.add(title);
      render.push(i);
      i.sum = car.filter((i) => i.title === title).length;
    }
  });

  console.log(render)

  //Agregar o quitar productos
  const add = (bolean, name, object) => {
    if (bolean) setCar((currentObj) => [...currentObj, object]);
    else
      setCar((currentObj) => {
        let deleted = false;
        return currentObj.filter((i) => {
          if (!deleted && i.title === name) {
            deleted = true;
            return false;
          }
          return true;
        });
      });
  };

  //Calcular total
  const Total = () => {
    let sum = 0;
    for (const i of car)
      sum = sum + i.price;

    return sum.toLocaleString("de-DE");
  };

  return (
    <>
      {car.length == 0 ? (<div><p>¡Ops! Esto parece estar vacío</p></div>) : (<section>
        <p>Detalle del pedido:</p>
        {render.map((i, x) => (
          <div className='card-carro' key={i.title}>
            <div>
              <img className='card-carro-img' src={i.image} alt={i.title} />
              <p>
                {i.title}
              </p>
            </div>
            <div className=''>
              <p>${(i.sum * i.price).toLocaleString("de-DE")}</p>
              <div className='card-carro-comandos'>
                <button
                  onClick={() => add(false, i.title, i)}
                >
                  -
                </button>
                <h5>{i.sum}</h5>
                <button
                  onClick={() => add(true, i.title, i)}
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