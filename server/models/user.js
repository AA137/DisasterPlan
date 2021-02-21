const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  age: Number,
  address: String,
  english: Boolean,
  phone: String,
  //for formatting stuff etc. -- no reason to keep as number
  conditions: String,
  disabilities: String,
  medication: String,
  healthcare: String,
  dietary: String,
  allergies: String,
  considerations: String,
  roommates: String,
  ages: Array,
  //accurate???
  pets: String,
  car: Boolean,
  locations: Array,
  //is this right??
  iscontact_name: String,
  iscontact_phone: String,
  iscontact_address: String,
  ooscontact_name: String,
  ooscontact_number: String,
  ooscontact_address: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
