
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

user.pre('save', function Save(next) {
   const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

user.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Users', user, 'Users');
