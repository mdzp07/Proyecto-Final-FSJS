import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="banner">
            <div className="bannerComandos">
                <Link to="/">
                    <button className="Comandos__button">
                        <i className="bi bi-house-fill"></i>
                    </button>
                </Link>
                <Link to="/Login">
                    <button className="Comandos__button">
                        <i className="bi bi-journal-text"></i>
                    </button>
                </Link>
                <Link to="/Perfil">
                    <button className="Comandos__button">
                        <i className="bi bi-person-fill"></i>
                    </button>
                </Link>
                <Link to="/Compra">
                    <button className="Comandos__button">
                        <i className="bi bi-cart-fill"></i>
                    </button>
                </Link>
                <Link to="/salir">
                    <button className="Comandos__button">
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Banner;