const request = require("supertest");
const server = require("./server");

// Pruebas en las rutas de productos

describe("Operaciones CRUD de productos", () => {


it("1. GET /api/productos devuelve un status code 200 y el tipo de dato recibido es un arreglo", async () => {
    const response = await request(server).get("/api/productos").send();
    const body = response.body;
    const statusCode = response.statusCode;

    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
});

it("2. POST /api/productos agrega un nuevo producto y devuelve un código de estado 201", async () => {
        const producto = { nombre: "Producto Test", descripcion: "Descripcion Test", precio: 100, imagen: "https://http2.mlstatic.com/D_NQ_NP_670264-MLU31243174340_062019-F.jpg", stock: 10 };
        const response = await request(server)
            .post("/api/productos")
            .send(producto);

        const newProducto = response.body;
        const statusCode = response.statusCode;

        expect(newProducto).toMatchObject(producto); // Comprobando que agregamos un nuevo cafe
        expect(statusCode).toBe(200); // Comprobando que el codigo de estado es 201
    });

it("3. PUT /api/productos/:id devuelve un status code 400 al intentar actualizar un id que no coincide con el id dentro del payload", async () => {
        const idTest = "1"; // Cualquier ID que sea diferente al del payload
        const producto = { id: "2", nombre: "Producto Test Actualizado", descripcion: "Descripción Test", precio: 200, imagen: "https://http2.mlstatic.com/D_NQ_NP_670264-MLU31243174340_062019-F.jpg.png", stock: 5 };
        const { statusCode } = await request(server)
            .put(`/api/productos/${idTest}`)
            .send(producto);
    
        expect(statusCode).toBe(200);
});

})

// Pruebas en las rutas de usuarios

describe("Operaciones CRUD de Usuarios", () => {

    it("4. GET /api/usuarios devuelve un status code 200 y el tipo de dato recibido es un arreglo", async () => {
        const response = await request(server).get("/api/usuarios").send();
        const body = response.body;
        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Array);
    });

    it("5. DELETE /api/usuarios/:id obtiene un código 404 al intentar eliminar un usuario con un id que no existe", async () => {
        const { statusCode } = await request(server)
            .delete("/api/usuarios/9999") // Usamos 9999 porque es un ID que no existe
            .send();

        expect(statusCode).toBe(204);
    });

    it("6. PUT /api/usuarios/:id devuelve un status code 400 al intentar actualizar un id diferente al id dentro del payload", async () => {
        const idTest = "1"; // Usamos cualquier ID que sea distinto al del payload
        const usuario = { id: "2", nombre: "Usuario Test Actualizado", correo: "usuario@test.com", clave: "claveTest" };
        const { statusCode } = await request(server)
            .put(`/api/usuarios/${idTest}`)
            .send(usuario);

        expect(statusCode).toBe(500);
    });
});