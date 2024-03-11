const mongoose = require("mongoose");

const Chat = mongoose.model("Chat", new mongoose.Schema({
    chatname: String,
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}))

module.exports = Chat;