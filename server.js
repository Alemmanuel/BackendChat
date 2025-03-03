// server.js
const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();
const cors = require('cors');

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir acceso desde cualquier frontend
app.use(cors());

// Exponemos los endpoints bajo /api
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
