const https = require('https');
const Model = require('./model');
const logger = require('winston');
const {
    signToken,
} = require('./../authAPI');

exports.create = (req, res, next) => {
    const { body } = req
    const document = new Model(body)
    document.save()
        .then((doc) => {
            res.status(201);
            res.json({
                success: true,
                item: doc,
                'userId': doc.id
            });
        })
        .catch((err) => {
            next(new Error(err));
        })
};

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

exports.signup = (req, res, next) => {
    const {
        body,
    } = req;
    if (body.contact_name !== undefined && body.company_name !== undefined && body.email !== undefined) {
        const token = signToken({
            contact_name: body.contact_name,
            company_name: body.company_name,
            email: body.email
        });
        res.json({
            success: true,
            meta: {
                token
            },
        });
    } else {
        res.json({
            success: false,
            reason: "Missing parameters"
        })
    }

};
exports.all = (req, res, next) => {
    Model.find().exec()
        .then((docs) => {
            res.json({
                success: true,
                items: docs,
            });
        })
        .catch((err) => {
            next(new Error(err));
        });
};

exports.read = (req, res, next) => {
    res.json();
};

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
    res.json({});
};