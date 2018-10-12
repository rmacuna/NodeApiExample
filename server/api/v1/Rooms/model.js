const mongoose = require('mongoose');
const logger = require('winston');
const { Schema } = mongoose;


const fields = {
	idHotel: {
		type: String,
		required: true
	},
	RoomsAvailable: {
		type: Number,
		required: true
	}
}

const Room = new Schema(fields, {
	timestamps: true
});

module.exports = mongoose.model('Rooms', reservation, 'Rooms');