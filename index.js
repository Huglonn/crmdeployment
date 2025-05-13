const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

// Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});


// Crear servidor
const app = express();

// Habilitar el bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitar cors
// app.use(cors({
//     origin: "http://localhost:5173",
// }));
// Definir un diomion(s) para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // Revisar si la petición viene de un servidor que está en la lista blanca
        const existe = whitelist.some(dominio => dominio === origin)
        if (existe || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));

// Carpeta publica 
app.use(express.static('uploads'));


// Rutas de la app
app.use('/', routes());

//host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Iniciar app
app.listen(port, host, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
});