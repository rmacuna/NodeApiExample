

/*
Extraemos el constructor del esquema (Schema) 
del objeto mongoose.

Agregamos la opción timestamps al Schema para que
 automáticamente nos añada los atributos de createdAt y updatedAt, el primero se establece una vez se guarda satisfactoriamente el documento y el segundo una vez se actualice satisfactoriamente el documento.
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;


/* Creamos el objeto */
const fields = {
	HOTEL_NAME: {
		type: String,
		required: true
	},
	ADDRESS: {
		type: String,
		required: true
	},
	STATE: {
		type: String
	},
	PHONE: {
		type: String,
	},
	FAX: {
		type: String
	},
	EMAIL_ID: {
		type: String
	},
	WEBSITE: {
		type: String
	},
	TYPE: {
		type: String
	},
	Rooms: {
		type: String,
		required: true
	},
	Size: {
		type: String
	}
}

const hotel = new Schema(fields, {
	timestamps: true 
})

module.exports = mongoose.model('hotel', hotel);
