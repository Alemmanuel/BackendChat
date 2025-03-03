const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   // 🔹 Agrega el puerto aquí
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error("❌ Error de conexión:", err.message);
    } else {
        console.log("✅ Conexión a MySQL exitosa");
    }
});

module.exports = connection;
