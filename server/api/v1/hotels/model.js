/*
Extraemos el constructor del esquema (Schema)
del objeto mongoose.

Agregamos la opción timestamps al Schema para que automáticamente nos añada los atributos de
createdAt y updatedAt, el primero se establece una vez se guarda satisfactoriamente el documento y
el segundo una vez se actualice satisfactoriamente el documento.

*/

const mongoose = require('mongoose');
const https = require('https');
const logger = require('winston');
const { Schema } = mongoose;


/* Creamos el objeto */
const fields = {
    'HOTEL NAME': {
        type: String,
        required: true
    },
    ADDRESS: {
        type: String,
        required: true
    },
    STATE: {
        type: String,
        required: true
    },
    PHONE: String,
    FAX: String,
    'EMAIL ID': {
        type: String,
        unique: true,
        dropDups: true
    },
    WEBSITE: String,
    TYPE: {
        type: String,
        required: true
    },
    Rooms: {
        type: Number,
        required: true
    },
    Size: String,
    Latitude: String,
    Longitude: String,
};


const hotel = new Schema(fields, {
    timestamps: false,
});

hotel.pre('save', function Save(next) {
    if (this.Rooms >= 10 && this.Rooms <= 50) {
        this.Size = 'Small';
    } else if (this.Rooms >= 51 && this.Rooms < 100) {
        this.Size = 'Medium';
    } else if (this.Rooms >= 100) {
        this.Size = 'Large';
    }
    next();
})

module.exports = mongoose.model('Hoteles1', hotel, 'Hoteles1');