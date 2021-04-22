// Modulos Requeridos 
const express = require('express');
const connectDB = require('./config/db');

// Rutas Requeridas
const usersRouter = require('./routes/users')

// Crear Servidor
const app = express();

// Conectar DB
connectDB();

// Habilitar express.json para leer datos enviados desde frontend
app.use(express.json({ extended: true }));

// Puerto de la App
const PORT = process.env.PORT || 4000;

// Importar Rutas
app.use('/api/users', usersRouter);

// Server Home 
app.get('/', (req, res) => {
    res.send('MernTasks Server')
});

// Iniciar app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});