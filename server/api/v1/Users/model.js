
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;


const fields = {
  email: {
  	type: String,
  	required: true,
  	unique: true,
  	dropDups: true,
  },
  password: {
  	type: String,
  	required: true
  },
  name: {
  	type: String,
  	required: true
  },
  lastname: {
  	type: String,
  	required: true
  },
  address: {
  	type: String,
  	required: true
  },
  userId: {
  	type: String,
  	unique: true,
    dropDups: true,
  },
  roomsReserved: {
    type: Object 
  },
};


const user = new Schema(fields, {
  timestamps: true,
});

user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model('Users', user, 'Users');
