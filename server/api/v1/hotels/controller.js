const https = require('https');
const logger = require('winston');
const Model = require('./model');
const Reservation = require('../reservaciones/model');




exports.create = (req, res, next) => {
    const { body } = req;
    const hotel = new Model();
    const document = new Model(body)
    document.save()
        .then((doc) => {
            res.json({
                hotel: doc,
                success: true
            });
        })
        .catch((err) => {
            next(new Error(err));
        })

};


exports.findAllLatitudes = (req, res, next) => {
    Model.find({}).exec()
        .then((docs) => {
            docs.forEach(function(hotel, index) {
                const address = hotel.ADDRESS.replace(/["]+/g, '');
                https.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=5SG40a8DgDDIML1neFDT&app_code=JQq-VvSFvrMhgETOWqK09A&searchtext=" + address, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    resp.on('end', () => {
                        try {
                            JSON.parse(data).Response.View.length;
                            const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
                            Model.updateMany({ ADDRESS: hotel.ADDRESS }, { Latitude: coordinates.Latitude, Longitude: coordinates.Longitude }, (err) => {});
                        } catch (e) {}
                    })
                })
            });
        })
}

exports.id = (req, res, next, id) => {
    Model.findById(id).exec()
        .then((doc) => {
            if (doc) {
                req.doc = doc;
                next();
            } else {
                const message = `${Model.modelName} not found`;
                logger.info(message);
                res.json({
                    success: false,
                    message,
                });
            }
        })
        .catch((err) => {
            next(new Error(err));
        });
};

/* Model.find({}).exec()
     .then((docs) => {
         docs.forEach(function(hotel, index) {
             const address = hotel.ADDRESS.replace(/["]+/g, '');
             https.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=5SG40a8DgDDIML1neFDT&app_code=JQq-VvSFvrMhgETOWqK09A&searchtext=" + address, (resp) => {
                 let data = '';
                 resp.on('data', (chunk) => {
                     data += chunk;
                 });
                 resp.on('end', () => {
                     try {
                      JSON.parse(data).Response.View.length;
                         const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
                         console.log(coordinates);
                         Model.updateMany({ADDRESS: hotel.ADDRESS}, { Latitude: coordinates.Latitude, Longitude: coordinates.Longitude }, (err) => {});
                     } catch(e) {}
                 })
             })
         });
    })
*/


exports.all = (req, res, next) => {
    Model.find().exec()
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            next(new Error(err));
        });
};

exports.read = (req, res, next) => {

    function haversineDistance(params) {
        function toRad(x) {
            return x * Math.PI / 180;
        }
        var lon1 = params.long1;
        var lat1 = params.lat1;

        var lon2 = params.long2;
        var lat2 = params.lat2;

        var R = 6371; // km

        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }

    const params = req.query;
    if (params.Range) {
        let near = [];
        Model.find({})
            .then((docs) => {
                docs.forEach(function(hotel, index) {
                    const coordinates = {
                        'lat1': params.Latitude,
                        'long1': params.Longitude,
                        'lat2': hotel.Latitude,
                        'long2': hotel.Longitude
                    };
                    const d = haversineDistance(coordinates);
                    console.log(d);
                    if (d <= params.Range) {

                        near.push(hotel);
                    }
                });
                res.json(near);
            })
            .catch((err) => {
                next(new Error(err));
            });
    } else {
        Model.find(params).exec()
            .then((data) => {
                res.json({ data });
            })
            .catch((err) => {
                next(new Error(err));
            });
    }

};

exports.checkAvailable = (req, res, next) => {
    const params = req.query;
    let dif;
    let c = 0;
    let availableHotels = [];
    Reservation.find({})
        .then((reservation) => {
            console.log(reservation);
            reservation.forEach(function(reserv, index) {
                confirm(reserv);
            })
        })
        .catch((err) => {
            next(new Error(err));
        })

    function confirm(reservation) {
        Model.find({})
            .then((hotel) => {
                hotel.forEach(function(hotel, index) {
                    if (hotel._id.toString() === reservation.idHotel) {
                        dif = hotel.Rooms - reservation.RoomsReserved
                        if (reservation.endDate <= params.startDate && reservation.startDate >= params.endDate) {
                            if (params.State === hotel.STATE && dif > 0) {
                                availableHotels.push(hotel);
                                c++;
                            }
                        }
                    } else {
                        if (params.State === hotel.STATE) {
                            availableHotels.push(hotel);
                            c++;
                        }
                    }
                })
                res.json(availableHotels)

            })

            .catch((err) => {
                next(new Error(err));
            })

    }
}



exports.update = (req, res, next) => {
    const { doc, body } = req;
    Object.assign(doc, body);
    doc.save()
        .then((updated) => {
            res.json({
                success: 1,
                updated
            });
        })
        .catch((err) => {
            next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const { doc } = req;
    doc.remove()
        .then((removed) => {
            res.json({
                success: true,
                removed
            });
        })
        .catch((err) => {
            next(new Error(err));
        });
};