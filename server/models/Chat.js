const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },
    botResponse: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    session_id: { type: String } // Optional: for tracking sessions
});

module.exports = mongoose.model('Chat', chatSchema);
