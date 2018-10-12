const mongoose = require('mongoose');
const https = require('https');
const logger = require('winston');
const hotel = require('../hotels/model');
const { Schema } = mongoose;


const fields = {
	Userid: {
		type: String,
		required: true,
	},
	idHotel: {
		type: String,
		required: true
	},
	'HOTEL NAME': {
		type: String,
		required: true
	},
	startDate: {
		type: String,
		required: true
	},
	State: {
		type: String,
		required: true
	},
	endDate: {
		type: String,
		required: true
	},
	RoomsReserved: {
		type: Number,
		required: true,
		min: [1, 'You need to book at least 1 room']
	}
}

const reservation = new Schema(fields, {
	timestamps: true
});
module.exports = mongoose.model('Reservation', reservation, 'Reservations');