const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  received: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
