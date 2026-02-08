const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rankingRoutes = require('./routes/rankingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors()); // Crucial para Flutter
app.use(express.json()); // Permite leer JSON en req.body

// Rutas base
app.use('/api/ranking', rankingRoutes);
app.use('/api/users', userRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

module.exports = app;