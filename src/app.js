const express = require('express');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Rutas
const tareaRoutes = require('./api/v1/routes/tareas');
app.use('/api/v1/tareas', tareaRoutes);

module.exports = app;
