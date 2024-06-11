import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        console.log("pasó1: ", email, password);
        const consulta = "SELECT * FROM usuario WHERE correo = $1";
        const values = [email];
        console.log('Consulta:', consulta, 'Values:', values);
        
        const result = await pool.query(consulta, values);
        console.log('Resultado de la consulta:', result.rows[0].clave);

        if (result.rowCount === 0) {
            console.log('No se encontró el usuario con ese correo.');
            return false;
        }

        const passwordEncriptada = result.rows[0].clave;
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
        console.log(passwordEsCorrecta);

        if (!passwordEsCorrecta) {
            console.log('Contraseña incorrecta.');
            return false;
        }

        const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
        return token;
    } catch (err) {
        console.error('Error en la autenticación:', err);
        return false;
    }
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

const createUsuario = async (nombre, correo, password) => {
    const passwordEncriptada = bcrypt.hashSync(password);
    console.log("hola:", nombre, correo, passwordEncriptada)
    const consulta = "INSERT INTO usuario values (DEFAULT, $1, $2, $3) RETURNING *";
    const values = [nombre, correo, passwordEncriptada];
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

export {
    autenticarUsuario,
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};
