const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.chat = require("./chat.model");
db.message = require("./message.model");

module.exports = db;