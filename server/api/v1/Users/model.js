const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const logger = require('winston');
const { Schema } = mongoose;


const fields = {
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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
    }
};


const user = new Schema(fields, {
    timestamps: true,
});

user.pre('save', function Save(next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password);
    }
    next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', user, 'Users');