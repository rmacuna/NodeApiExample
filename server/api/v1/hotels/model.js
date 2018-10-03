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
	_id: Schema.Types.ObjectId,
	HOTEL_NAME: String,
	ADDRESS: String,
	STATE: String,
	PHONE: String,
	FAX: String,
	EMAIL_ID: String,
	WEBSITE: String,
	TYPE: String,
	Rooms: Number,
	Size: String
}


const hotel = new Schema(fields, {
	timestamps: false 
})

module.exports = mongoose.model('Hoteles1', hotel, 'Hoteles1');





