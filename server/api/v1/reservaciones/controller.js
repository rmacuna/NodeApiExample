const Model = require('../reservaciones/model');
const Hotel = require('../hotels/model');
const logger = require('winston');

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

exports.create = (req, res, next) => {
    const booking = req.body;
    console.log(booking);
    Model.aggregate([ 
        {
        $match: {
            $and: [{
                idHotel: booking.idHotel,
            },
                {
                startDate: {
                    $lte: booking.endDate,
                },
            }, {
                endDate: {
                    $gte: booking.startDate,
                },
            }] },
        }, {
        $group: {
            _id: null,
            total: {
                $sum: "$RoomsReserved"
            }
        }
    }])
    .then(function(result) {
        const booked = result;
        let availables;
        Hotel.findById(booking.idHotel)
            .then((hotel) => {
                console.log(hotel);
                if (booked.length !== 0) {
                    console.log(booked[0]);
                    availables = hotel.Rooms - booked[0].total;
                } else {
                    availables = hotel.Rooms;
                }
                console.log(availables);
                if(availables >= booking.RoomsReserved) {
                    const document = new Model(req.body);
                    document.save()
                        .then((saved) => {
                            res.json({
                                success: true,
                                message: 'Rooms Reserved',
                                reservationID: saved._id
                            });
                        })
                        .catch((err) => {
                            next(new Error(err));
                        })
                } else {
                    res.json({
                        success: false,
                        message: 'Cannot reservate because there are no more rooms availables'
                    });
                }
            })
    })
};

exports.all = (req, res, next) => {
    res.json({});
};

exports.read = (req, res, next) => {
    res.json({});
};

exports.update = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};