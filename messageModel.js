// messageModel.js
const db = require('./db');

const Message = {
  // Inserta un mensaje en la tabla "mensajes"
  create: (usuario, mensaje, callback) => {
    const sql = "INSERT INTO mensajes (usuario, mensaje) VALUES (?, ?)";
    db.query(sql, [usuario, mensaje], callback);
  },
  // Obtiene todos los mensajes ordenados por id ascendente
  getAll: (callback) => {
    const sql = "SELECT * FROM mensajes ORDER BY id ASC";
    db.query(sql, callback);
  }
};

module.exports = Message;
