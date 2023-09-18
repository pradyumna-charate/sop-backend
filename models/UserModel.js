const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  organization: {
    // id: String,
    name: String,
  },
  site: {
    // id: String,
    name: String,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;


