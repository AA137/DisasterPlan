const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  response: JSON,
});

// compile model from schema
module.exports = mongoose.model("user", SurveySchema);
