const https = require('https');
const Model = require('./model');

exports.create = (req, res, next) => {
    const { body } = req
    const name = body.name;
    const last = body.lastname;
    const email = body.email;
    const userId = generateUniqueId(last, email);
    body['userId'] = userId;
    const user = new Model();
    body.password = user.generateHash(body.password);
    const document = new Model(body)
    document.save()
        .then((doc) => {
            res.json({
                'name': name,
                'userId': userId
            });
        })
        .catch((err) => {
            next(new Error(err));
        })

    function generateUniqueId(name, email) {
        let str1 = email.split('@')[0];
        let str2 = last.charAt(0);
        const username = str2 + str1;
        // const exist = true;
        // while (exist) {
        //     Model.find({ userId: username }).limit(1).exec()
        //         .then((docs) => {
        //             if (docs.length === 0 || docs === typeof undefined || docs === null) {
        //                 exist = false;
        //             }
        //         })
        // }
        return username;
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
    // function isAllFieldsFilled(body) {
    //     const flag = true;
    //     for (field in body) {
    //         if (body.hasOwnProperty(field)) {
    //             if (body[field] === null && body[field] === typeof undefined || body[field].toString().trim().lenght === 0) {
    //                 flag = false;
    //             }
    //         } else {
    //             flag = false;
    //         }
    //     }
    //     return flag;
    // }

    function deleteIfEmpty(dataToSearch) {
        for (key in dataToSearch) {
            if (dataToSearch[key] === null || dataToSearch[key] === undefined || dataToSearch[key] === '') {
                delete dataToSearch[key];
            }
        }
    }
    /* 
        Una vez verificamos si los parametros enviados fueron llenados verificamos cuales 
        se utilizaran para actualizar el documento. 
    */
    const user = new Model();
    let fieldsToUpdate = {};
    fieldsToUpdate.email = body.email;
    fieldsToUpdate.password = user.generateHash(body.password);
    fieldsToUpdate.address = body.address;
    fieldsToUpdate.name = body.name;
    fieldsToUpdate.lastname = body.lastname;
    fieldsToUpdate.userId = body.userId;
    deleteIfEmpty(fieldsToUpdate);
    Model.update({ userId: userid }, fieldsToUpdate)
        .then((data) => {
            res.json({ message: 'User Updated' });
        })
        .catch((err) => {
            next(new Error(err));
        })


};

exports.delete = (req, res, next) => {
    res.json({});
};