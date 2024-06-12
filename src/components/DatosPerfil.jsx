import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';

const DatosPerfil = () => {
    // Obtener el estado de los likes y los datos de las tarjetas desde el contexto global
    const { likes } = useContext(Context);
    const [favoriteCards, setFavoriteCards] = useState([]);
    const [userData, setUserData] = useState(null);

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

    // Función para cargar los datos del usuario desde la API
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/usuarios');
            const jsonData = await response.json();
            if (jsonData.length > 0) {
                setUserData(jsonData[0]); // Selecciona el primer usuario
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    // Cargar los datos de las tarjetas favoritas y del usuario al montar el componente
    useEffect(() => {
        fetchFavoriteCards();
        fetchUserData();
    }, []);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4">Perfil</Typography>
                {userData && (
                    <Box mt={3}>
                        <Typography variant="h6">Nombre: {userData.nombre}</Typography>
                        <Typography variant="body1">Email: {userData.correo}</Typography>
                        {/* Render other user data as needed */}
                    </Box>
                )}
                <Box mt={5}>
                    <Typography variant="h6">Favoritos</Typography>
                    <Grid container spacing={3}>
                        {/* Renderizar las tarjetas favoritas */}
                        {favoriteCards.map((card, index) => (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={card.nombre}
                                        height="140"
                                        image={card.imagen}
                                        title={card.nombre}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {card.nombre}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {card.descripcion}
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary">
                                            $ {card.precio}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default DatosPerfil;
