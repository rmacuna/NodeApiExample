const mongoose = require('mongoose');
const logger = require('winston');
const { Schema } = mongoose;


const fields = {
    idHotel: {
        type: String,
    },
    capacity: {
        type: Number
    },
    roomsAvailable: {
        type: String
    }
};


const Room = new Schema(fields, {
    timestamps: true,
});

Room.pre('save', function Save(next) {
    next();
});

module.exports = mongoose.model('Room', Room, 'Rooms');