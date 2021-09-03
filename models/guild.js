const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prime: String,
  members: String,
});

module.exports = mongoose.model("Guild", guildSchema);