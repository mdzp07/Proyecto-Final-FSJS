import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
    getProductos, getProductoById, createProducto, updateProducto, deleteProducto,
    getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, autenticarUsuario,

} from './consultas.js';

dotenv.config();

const app = express();

app.listen(3000, () => {
    console.log(`Servidor encendido en puerto 3000`);
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas para productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/productos/:id', async (req, res) => {
    try {
        const producto = await getProductoById(req.params.id);
        res.json(producto);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen, stock } = req.body;
        const newProducto = await createProducto(nombre, descripcion, precio, imagen, stock);
        res.json(newProducto);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/api/productos/:id', async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen, stock } = req.body;
        const updatedProducto = await updateProducto(req.params.id, nombre, descripcion, precio, imagen, stock);
        res.json(updatedProducto);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/api/productos/:id', async (req, res) => {
    try {
        await deleteProducto(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rutas para usuarios


app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await getUsuarioById(req.params.id);
        res.json(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/autenticar', async (req, res) => {
    try {
        const {correo, clave} = req.body;
        console.log(req.body)
        const usuario = await autenticarUsuario(correo, clave);
        res.json(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, correo, clave } = req.body;
        console.log(req.body);
        const newUsuario = await createUsuario(nombre, correo, clave);
        res.json(newUsuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const { nombre, correo, telefono, direccion, clave } = req.body;
        const updatedUsuario = await updateUsuario(req.params.id, nombre, correo, telefono, direccion, clave);
        res.json(updatedUsuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        await deleteUsuario(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default app;