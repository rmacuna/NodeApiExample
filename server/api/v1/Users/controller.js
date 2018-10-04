const https = require('https');
const Model = require('./model');

exports.create = (req, res, next) => {
    const {body} = req

    const name = body.name;
    const last = body.lastname;
    const userId = generateUniqueId(name,last);
    body['userId'] = userId;
    const document = new Model(body)
    document.save()
    .then((doc) => {
        res.json({
            'name': name,
            'lastname': last,
            'userId': userId
        });
    })

    function generateUniqueId(name,lastname){
        let str1 = name.charAt(0);
        let str2 = lastname.substring(1, lastname.length);
        return str1 + str2;
    }
 
};


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
    res.json();
};

exports.update = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};