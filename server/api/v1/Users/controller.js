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
            res.json({
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
    const { body } = req;
    const userid = req.params.id;

    function deleteIfEmpty(dataToSearch) {
        for (key in dataToSearch) {
            if (dataToSearch[key] === null || dataToSearch[key] === undefined || dataToSearch[key] === '') {
                delete dataToSearch[key];
            }
        }
        return dataToSearch;
    }

    function validatePass(password) {
        if (password !== undefined && password !== null) {
            const trimmed = password.trim().length;
            if (trimmed > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
    /* 
        Una vez verificamos si los parametros enviados fueron llenados verificamos cuales 
        se utilizaran para actualizar el documento. 
    */
    const user = new Model();
    let fieldsToUpdate = {};
    if (Object.keys(body).length > 0) {
        fieldsToUpdate.email = body.email;
        if (validatePass(body.password)) {
            fieldsToUpdate.password = user.generateHash(body.password);
        }
        fieldsToUpdate.address = body.address;
        fieldsToUpdate.name = body.name;
        fieldsToUpdate.lastname = body.lastname;
        fieldsToUpdate.userId = body.userId;
        deleteIfEmpty(fieldsToUpdate);
        Model.updateOne({ userId: userid }, fieldsToUpdate)
            .then((data) => {
                if (data.n === 0) {
                    res.json({ message: 'User Not Found', responseType: '0' });
                } else {
                    res.json({ message: 'User Updated', responseType: '1' });
                }
            })
            .catch((err) => {
                res.json({ error: err, responseType: '0' });
            })
    } else {
        res.json({ error: 'Fields are empty', responseType: '0' });
    }
};

exports.delete = (req, res, next) => {
    res.json({});
};