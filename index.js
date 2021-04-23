// Modulos Requeridos 
const express = require('express');
const connectDB = require('./config/db');

// Rutas Requeridas
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects')
const tasksRouter = require('./routes/tasks')

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
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

// Server Home 
app.get('/', (req, res) => {
    res.send('MernTasks Server')
});

// Iniciar app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});