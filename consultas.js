const { Pool } = require('pg');
const { config } = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

config();

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,    
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
});

// Autenticación de usuario
const autenticarUsuario = async (email, password) => {
    try {
        const consulta = "SELECT * FROM usuario WHERE correo = $1";
        const values = [email];
        
        const result = await pool.query(consulta, values);

        if (result.rowCount === 0) {
            console.log('No se encontró el usuario con ese correo.');
            return false;
        }

        const passwordEncriptada = result.rows[0].clave;
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

        if (!passwordEsCorrecta) {
            return false;
        }

        const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
        return token;
    } catch (err) {
        console.error('Error en la autenticación:', err);
        return false;
    }
}

// Validar el token recibido en las cabeceras en la ruta
const verificarYdecodificar = async (token) => {
    jwt.verify(token, "az_AZ");
    const {email} = jwt.decode(token);
    const consulta = "SELECT * FROM usuario WHERE correo = $1";
    const values = [email];
    const {rows, rowCount} = await pool.query(consulta, values);
    return(rows)
  }



// Consultas para los productos
const getProductos = async () => {
    const { rows } = await pool.query("SELECT * FROM producto");
    return rows;
}

const getProductoById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM producto WHERE id_producto = $1", [id]);
    return rows[0];
}

const createProducto = async (nombre, descripcion, precio, imagen, stock) => {
    try {
        const consulta = "INSERT INTO producto (nombre, descripcion, precio, imagen, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [nombre, descripcion, precio, imagen, stock];
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error; // Re-lanza el error para que el código que llama a esta función pueda manejarlo
    }
};


const updateProducto = async (id, nombre, descripcion, precio, imagen, stock) => {
    const consulta = "UPDATE producto SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, stock = $5 WHERE id_producto = $6 RETURNING *";
    const values = [nombre, descripcion, precio, imagen, stock, id];
    const { rows } = await pool.query(consulta, values);
    return rows[0];
}

const deleteProducto = async (id) => {
    await pool.query("DELETE FROM producto WHERE id_producto = $1", [id]);
}

// Consultas para los usuarios
const getUsuarios = async () => {
    const { rows } = await pool.query("SELECT * FROM usuario");
    return rows;
}

const getUsuarioById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM usuario WHERE id_usuario = $1", [id]);
    return rows[0];
}

const createUsuario = async (nombre, correo, password, rol = 'usuario') => {
    const passwordEncriptada = bcrypt.hashSync(password);
    const consulta = "INSERT INTO usuario (nombre, correo, clave, rol) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [nombre, correo, passwordEncriptada, rol];
    const { rows } = await pool.query(consulta, values);
    return rows[0];
};

const updateUsuario = async (id, nombre, correo, telefono, direccion, clave) => {
    const consulta = "UPDATE usuario SET nombre = $1, correo = $2, telefono = $3, direccion = $4, clave = $5 WHERE id_usuario = $6 RETURNING *";
    const values = [nombre, correo, telefono, direccion, clave, id];
    const { rows } = await pool.query(consulta, values);
    return rows[0];
}

const deleteUsuario = async (id) => {
    await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
}

module.exports = {
    autenticarUsuario,
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getUsuarios,
    getUsuarioById,
    createUsuario,
    verificarYdecodificar,
    updateUsuario,
    deleteUsuario,
};
