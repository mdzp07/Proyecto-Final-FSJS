const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {
    getProductos, getProductoById, createProducto, updateProducto, deleteProducto,
    getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, verificarYdecodificar, autenticarUsuario,
} = require('./consultas.js');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Servidor encendido en puerto ${PORT}`);
});

const corsConfig = {
    origin: 'https://proyectofinaladl.netlify.app',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsConfig));

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
        console.log(req.body);
        const newProducto = await createProducto(nombre, descripcion, precio, imagen, stock);
        res.json(newProducto);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/verificacion', async (req, res) => {
    try {
        const Authorization = req.header("Authorization"); 
        const token = Authorization.split("Bearer ")[1];
        const answer = await verificarYdecodificar (token);
        if(!answer){
            res.send("No se ha podido verificar.");
          }else{
            res.send(true);
            console.log("Enviado.")
          }
        }catch (err) {
        res.status(500).send(err.message);}
     });

     app.delete('/api/productos/:id', async (req, res) => {
        try {
            const result = await deleteProducto(req.params.id);
            if (result.affectedRows === 0) {
                res.status(404).send('Producto no encontrado');
            } else {
                res.status(204).send();
            }
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).send(err.message);
        }
    });

    app.delete('/api/productos/:id_producto', async (req, res) => {
        try {
          const result = await deleteProducto(req.params.id_producto);
          if (result.affectedRows === 0) {
            res.status(404).send('Producto no encontrado');
          } else {
            res.status(204).send();
          }
        } catch (err) {
          console.error('Error al eliminar producto:', err);
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



/////////////////////////////////////////////////////7
// Middleware para verificar credenciales
const verificarCredenciales = async (req, res, next) => {
    const { correo, clave } = req.body;
    const usuario = await autenticarUsuario(correo, clave);
    console.log("esto llega al mid como usuario: ", usuario)
    if (!usuario) {
      return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
    }
    console.log("Next sin problemas.")
    next();
  };


app.post('/autenticar', verificarCredenciales, async (req, res) => {
    try {
        const {correo, clave} = req.body;
        const usuario = await autenticarUsuario(correo, clave);
        res.json(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
/////////////////////////////////////////////////////


app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, correo, clave, rol } = req.body; // Incluye el campo rol
        console.log(req.body);
        const newUsuario = await createUsuario(nombre, correo, clave, rol); // Pasa el rol a createUsuario
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

module.exports = app;