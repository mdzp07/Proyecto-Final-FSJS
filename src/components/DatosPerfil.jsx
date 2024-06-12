import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';

const DatosPerfil = () => {
    // Obtener el estado de los likes y los datos de las tarjetas desde el contexto global
    const { likes } = useContext(Context);
    const [favoriteCards, setFavoriteCards] = useState([]);

    // Función para cargar los datos de las tarjetas favoritas desde la API
    const fetchFavoriteCards = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const jsonData = await response.json();
            const favoriteCardsData = likes.map(index => jsonData[index]);
            setFavoriteCards(favoriteCardsData);
        } catch (error) {
            console.error('Error al obtener los datos de las tarjetas favoritas:', error);
        }
    };

    // Cargar los datos de las tarjetas favoritas al montar el componente
    useEffect(() => {
        fetchFavoriteCards();
    }, []);

    return (
        <div className="container">
            <h1>Perfil</h1>
            <div className="mb-3">
                <label htmlFor="favoritos" className="form-label">Favoritos</label>
                {/* Renderizar las tarjetas favoritas */}
                {favoriteCards.map((card, index) => (
                    <div key={index} className="col-md-3 d-flex align-items-stretch g-3">
                        <div className="card-body">
                            <h5 className="card-title">{card.nombre}</h5>
                            <p className="card-text">{card.descripcion}</p>
                            <p className='card-text'>$ {card.precio}</p>
                            <img src={card.imagen} alt={card.descripcion} className="card-img-top" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DatosPerfil;
