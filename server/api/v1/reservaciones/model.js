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
	'Start Date': {
		type: Date,
		required: true
	},
	State: {
		type: String,
		required: true
	},
	'End Date': {
		type: Date,
		required: true
	},
	RoomsReserved: {
		type: Number,
		required: true
	},
	RoomsAvailable: {
		type: Number
	}
}

const reservation = new Schema(fields, {
	timestamps: true
});

reservation.pre('save', function Save (next) {
	hotel.find({_id: this.idHotel })
		.then((hotel) => {
			const max_capacity = hotel.Rooms;
			
		})
		.catch((err) => {

		})
})

module.exports = mongoose.model('Reservation', reservation, 'Reservations');