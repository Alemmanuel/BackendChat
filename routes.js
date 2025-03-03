// routes.js
const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// Ruta GET para obtener todos los mensajes
router.get('/mensajes', controllers.obtenerMensajes);

// Ruta POST para enviar un mensaje y traducirlo
router.post('/mensajes', controllers.enviarMensaje);

module.exports = router;
