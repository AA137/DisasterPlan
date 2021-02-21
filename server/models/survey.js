const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  response: JSON,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
