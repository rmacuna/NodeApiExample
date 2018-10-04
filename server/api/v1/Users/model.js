
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;



const fields = {
  email: String,
  password: String,
  name: String,
  lastname: String,
  address: String,
  userId: String,
};


const user = new Schema(fields, {
  timestamps: true,
});

user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model('Users', user, 'Users');
