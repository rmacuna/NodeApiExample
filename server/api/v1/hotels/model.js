/*
Extraemos el constructor del esquema (Schema)
del objeto mongoose.

Agregamos la opción timestamps al Schema para que automáticamente nos añada los atributos de
createdAt y updatedAt, el primero se establece una vez se guarda satisfactoriamente el documento y
el segundo una vez se actualice satisfactoriamente el documento.

*/

const mongoose = require('mongoose');
const https = require('https');
const { Schema } = mongoose;


/* Creamos el objeto */
const fields = {
    _id: { type: Schema.Types.ObjectId, auto: true },
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
    // if (this.Rooms === undefined) {
    //     if (this.Rooms >= 10 && this.Rooms <= 50) {
    //         this.Size = 'Small';
    //     } else if (this.Rooms >= 51 && this.Rooms <= 100) {
    //         this.Size = 'Medium';
    //     } else if (this.Rooms > 100 ) {
    //         this.Size = 'Large';
    //     }
    // }
    // if (this.Latitude === undefined && this.Longitude === undefined) {
    //     https.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=5SG40a8DgDDIML1neFDT&app_code=JQq-VvSFvrMhgETOWqK09A&searchtext=" + this.ADDRESS, (resp) => {
    //         let data = '';
    //         resp.on('data', (chunk) => {
    //             data += chunk;
    //         });
    //         resp.on('end', () => {
    //         try {
    //             console.log(JSON.parse(data).Response.View[0].Result[0].Location);
    //             JSON.parse(data).Response.View.length;
    //             const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
    //             this.Latitude = coordinates.Latitude;
    //             this.Longitude = coordinates.Longitude;
    //        } catch (e) {}
    //        })
    //   })
    // }
    next();
})

module.exports = mongoose.model('Hoteles1', hotel, 'Hoteles1');