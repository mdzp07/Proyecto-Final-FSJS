import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
            </div>
            <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input type="email" className="form-control" id="correo" placeholder="Correo" />
            </div>
            <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" />
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    );
}

export default Formulario;