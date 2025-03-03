const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const messageRoutes = require('./routes');
const Message = require('./messageModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use('/api', messageRoutes);

// WebSockets para recibir mensajes en tiempo real
io.on('connection', (socket) => {
    console.log("🔵 Usuario conectado");

    socket.on('sendMessage', (data) => {
        const { sender, message } = data;

        // Guardar mensaje en MySQL
        Message.create(sender, message, (err) => {
            if (err) return console.error(err);
            
            // Emitir mensaje a todos los clientes
            io.emit('receiveMessage', { sender, message });
        });
    });

    socket.on('disconnect', () => {
        console.log("🔴 Usuario desconectado");
    });
});

// Iniciar servidor
server.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
