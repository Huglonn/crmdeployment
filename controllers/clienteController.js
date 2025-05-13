const Clientes = require('../models/Clientes');

// Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // Almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Cliente agregado correctamente' });

    } catch (error) {
        // Si hay un error, console.log y next
        res.json(error)
        next();
    }

}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);

    } catch (error) {
        res.json(error)
        next();
    }
}

// Muestra un cliente por si ID
exports.mostrarCliente = async (req, res, next) => {

    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
        res.json({ mensaje: 'No existe el cliente' });
        next();
    }
    // Mostrar el cliente
    res.json(cliente);

}

// Actualizar un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
            req.body, {
            new: true
        });
        res.json(cliente);

    } catch (error) {
        res.send(error)
        next();
    }
}

// Eliminar un cliente por su ID
exports.eliminarCliente = async (req, res, next) => {
    try {
       await Clientes.findOneAndDelete ({_id : req.params.idCliente}); 
       res.json({mensaje: 'Cliente eliminado exitosamente'});
    } catch (error) {
        res.json(error)
        next();
    }
}
