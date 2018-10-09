const https = require('https');
const Model = require('./model');
const {
    signToken,
} = require('./../authAPI');

exports.create = (req, res, next) => {
    const { body } = req
    body['userId'] = generateUniqueId(body.lastname, body.email);
    const document = new Model(body)
    document.save()
        .then((doc) => {
            res.status(201);
            res.json({
                success: true,
                item: doc,
                'userId': doc.id,
                'username': body['userId']
            });
        })
        .catch((err) => {
            next(new Error(err));
        })

    function generateUniqueId(last, email) {
        let str1 = email.split('@')[0];
        let str2 = last.charAt(0);
        const username = str2 + str1;
        return username;
    }
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
    const user = new Model(doc);
    user.save()
        .then((updated) => {
            res.json({
                success: 1,
                item: updated,
            });
        })
        .catch((err) => {
            next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    res.json({});
};