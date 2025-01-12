const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
