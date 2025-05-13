const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../variables.env' });

module.exports = (req, res, next) => {

    // Autorizacion por el header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    // Obtener el token
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, process.env.LLAVESECRETA)

    } catch (error) {
        error.statusCode = 500;
        throw error;

    }

    // Si es un token valido, pero hay un error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;


    }
    next();


}