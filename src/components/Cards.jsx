// Cards.js
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';
import { Box, Button, Container, Typography } from '@mui/material';

const Cards = () => {
    const { car, setCar, likes, setLikes } = useContext(Context);
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

    const handleLikeClick = (index) => {
        setLikes((prevLikes) => {
            const newLikes = [...prevLikes];
            if (!newLikes.includes(index)) {
                newLikes.push(index);
            } else {
                newLikes.splice(newLikes.indexOf(index), 1);
            }
            return newLikes;
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <Typography 
            variant="h1" 
            component="h2"
            textAlign="center"
            margin="10px">Productos</Typography>
            <div className="row">
                {data.map((item, index) => (
                    <div  key={index} className="col-md-3 d-flex align-items-stretch g-3">
                        <div className="card mb-3 h-100">
                            <img src={item.imagen} className="card-img-top" alt={item.descripcion} />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre.length > 50 ? item.nombre.substring(0, 50) + '...' : item.nombre}</h5>
                                <p className="card-text">{item.descripcion.length > 50 ? item.descripcion.substring(0, 50) + '...' : item.descripcion}</p>
                                <p className='card-text'>$ {item.precio}</p>
                                <Box display="flex" flexDirection="column" gap="5px"  className=''>
                                    <Button  variant='outlined' color='secondary'  className={`cajaBoton ${likes.includes(index) ? 'liked' : ''}`} onClick={() => handleLikeClick(index)}>
                                        <i className={`bi bi-heart${likes.includes(index) ? '-fill' : ''} carro`} style={{ color: 'red' }}></i>
                                        <span className='add'>{likes.includes(index) ? ' Quitar de Favoritos' : ' Añadir a Favoritos'}</span>
                                    </Button>
                                    <Button variant='outlined' color='primary'  className='cajaBoton' onClick={() => add(item, index)}>
                                        <i className="bi bi-cart carro"></i>
                                        <span className='add'> Añadir al carrito</span>
                                    </Button>
                                    
                                </Box>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;

