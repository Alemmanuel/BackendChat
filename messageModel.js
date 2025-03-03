const db = require('./db');

const Message = {
    create: (sender, message, callback) => {
        const sql = "INSERT INTO messages (sender, message) VALUES (?, ?)";
        db.query(sql, [sender, message], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT sender, message, timestamp FROM messages ORDER BY timestamp ASC";
        db.query(sql, callback);
    }
};

module.exports = Message;
