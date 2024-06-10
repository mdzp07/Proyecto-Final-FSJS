import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';

const Cards = () => {

    //Context
    const { car, setCar } = useContext(Context);

    // Estado para almacenar los datos de la API
    const [data, setData] = useState([]);

    // Función para hacer la solicitud a la API
    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const jsonData = await response.json();
            setData(jsonData); // Almacenar los datos en el estado
        } catch (error) {
            console.error('Error fetching data:', error);
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
                        {/* Renderizar los datos en tarjetas */}
                        <div className="card mb-3">
                            <img src={item.image} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title.substring(0, 15)}</h5>
                                <p className="card-text">{item.description.substring(0, 50)}</p>
                                <p className='card-text'>$ {item.price}</p>
                                {/* Agrega más campos según la estructura de tus datos */}
                                <div className=''>
                                    <button className='cajaBoton' onClick={() => add(item, index)}>
                                        <i class="bi bi-cart carro"></i>
                                        <text className='add'>Añadir al carrito</text> 
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
