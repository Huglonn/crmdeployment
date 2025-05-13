const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../variables.env' });

exports.registrarUsuario = async (req, res) => {
    // Leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    // Encriptar la contraseña
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado con éxito' });

    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error' })
    }

}

exports.autenticarUsuario = async (req, res, next) => {
    // Buscar el usuario
    const usuario = await Usuarios.findOne({ email: req.body.email });

    if (!usuario) {
        // Si no existe el usuario
        await res.status(401).json({ mensaje: 'El Usuario no existe' });
        next();
    } else {
        // Si existe el usuario, verificar si el password es correcto o incorrecto
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            // Si el password es aincorrecto
            await res.status(401).json({ mensaje: 'La contraseña es incorrecto' });
            next();
        } else {
            // Si el password es correcto, y firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                _id: usuario._id
            },
                process.env.LLAVESECRETA,
                {
                    expiresIn: '1h'
                });
            // Retornar el TOKEN
            res.json({ token });
        }

    }

}