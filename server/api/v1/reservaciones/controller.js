const Model = require('../reservaciones/model');
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
    const document = new Model(req.body);
    document.save()
        .then((doc) => {
            res.json({
                success: true,
                Message: 'Reservation created',
                reservationId: doc._id
            });
        })
        .catch((err) => {
            next(new Error(err));
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