const express = require('express')
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// Middleware para proteger las rutas
const auth = require('../middleware/auth');



module.exports = function () {
    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes);

    // Obterer 1 cliente en especifico
    router.get('/clientes/:idCliente', auth,
        clienteController.mostrarCliente);

    // Actualizar Cliente
    router.put('/clientes/:idCliente', auth,
        clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', auth,
        clienteController.eliminarCliente);

    // -----------------PRODUCTOS-----------------------------
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    // Muestra todos los productos
    router.get('/productos', auth,
        productosController.mostrarProductos);

    // Muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', auth,
        productosController.mostrarProducto);

    // Actualizar productos
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar productos
    router.delete('/productos/:idProducto', auth,
        productosController.eliminarProducto);

    // Busqueda de productos
    router.post('/productos/busqueda/:query', auth,
        productosController.buscarProducto)

    // ---------------- PEDIDOS -------------------------------
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', auth,
        pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos', auth,
        pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', auth,
        pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', auth,
        pedidosController.actualizarPedido);

    // Eliminar pedido por su ID
    router.delete('/pedidos/:idPedido', auth,
        pedidosController.eliminarPedido);


    // ------------------------Usuarios ---------------------------
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario

    );
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    )

    // --------------FIN----------------------------------
    return router;
}

