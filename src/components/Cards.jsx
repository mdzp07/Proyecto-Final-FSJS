import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';

const Cards = () => {

    const { car, setCar } = useContext(Context);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const add = (i, x) => {
        setCar((currentProduct) => [...currentProduct, i]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 className='product-title'>Productos</h1>
            <div className="row">
                {data.map((item, index) => (
                    <div key={index} className="col-md-3">
                        <div className="card mb-3">
                            <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre.substring(0, 100)}</h5>
                                <p className="card-text">{item.descripcion.substring(0, 100)}</p>
                                <p className='card-text'>$ {item.precio}</p>
                                <div className=''>
                                    <button className='cajaBoton' onClick={() => add(item, index)}>
                                        <i className="bi bi-cart carro"></i>
                                        <span className='add'>Añadir al carrito</span> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;