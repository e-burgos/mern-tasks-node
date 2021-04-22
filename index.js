// Requerimos 
const express = require('express');
const connectDB = require('./config/db')

// Crear servidor
const app = express();

// Conectar DB
connectDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Definir pagina principal 
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// Iniciar app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});