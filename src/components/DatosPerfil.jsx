
import 'bootstrap/dist/css/bootstrap.min.css';

const DatosPerfil = () => {
    return (
        <div className="container">
            <h1>Perfil</h1>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
            </div>
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="usuario" placeholder="Usuario" />
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input type="text" className="form-control" id="direccion" placeholder="Dirección" />
            </div>
            <div className="mb-3">
                <label htmlFor="celular" className="form-label">Celular</label>
                <input type="text" className="form-control" id="celular" placeholder="Celular" />
            </div>
            <div className="mb-3">
                <label htmlFor="favoritos" className="form-label">Favoritos</label>
                <textarea className="form-control" id="favoritos" rows="3" placeholder="Escribe tus favoritos aquí..."></textarea>
            </div>
        </div>
    );
}

 export default DatosPerfil;

