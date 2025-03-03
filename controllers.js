const Message = require('./messageModel');

exports.getMessages = (req, res) => {
    Message.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
