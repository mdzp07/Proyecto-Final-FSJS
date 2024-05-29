import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Carrusel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1900"> {/* Carrusel */}
            <div className="carousel-inner"> {/* Contenedor de las diapositivas */}
                <div className="carousel-item active"> {/* Diapositiva activa */}
                    <img src="../public/img/pruebaBanner.jpg" className="d-block w-100" alt="Primera imagen" /> {/* Imagen 1 */}
                </div>
                <div className="carousel-item"> {/* Diapositiva */}
                    <img src="../public/img/pruebaOferta2.jpg" className="d-block w-100" alt="Segunda imagen" /> {/* Imagen 2 */}
                </div>
                <div className="carousel-item"> {/* Diapositiva */}
                    <img src="../public/img/pruebaOferta1.jpg" className="d-block w-100" alt="Tercera imagen" /> {/* Imagen 3 */}
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"> {/* Botón de control para ir a la diapositiva anterior */}
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"> {/* Botón de control para ir a la diapositiva siguiente */}
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carrusel;