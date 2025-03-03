// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Ej. 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    console.error('Detalles del error:', err);
    console.error('Configuración de conexión:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL');
});

module.exports = connection;
