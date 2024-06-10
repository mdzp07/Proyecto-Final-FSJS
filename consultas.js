import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

config();

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,    
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
});

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
    const consulta = "INSERT INTO producto (nombre, descripción, precio, imagen, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nombre, descripcion, precio, imagen, stock];
    const { rows } = await pool.query(consulta, values);
    return rows[0];
}

const updateProducto = async (id, nombre, descripcion, precio, imagen, stock) => {
    const consulta = "UPDATE producto SET nombre = $1, descripción = $2, precio = $3, imagen = $4, stock = $5 WHERE id_producto = $6 RETURNING *";
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

const createUsuario = async (nombre, correo, clave) => {
    const consulta = 'INSERT INTO Usuario (nombre, correo, clave) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, correo, clave];
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
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
