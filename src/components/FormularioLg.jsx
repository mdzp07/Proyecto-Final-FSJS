import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioLg = () => {
    return (
        <div className="container">
            <h1>FormularioLg</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default FormularioLg;