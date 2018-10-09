const https = require('https');
const Model = require('./model');
// const {
//     auth
// } = require('./../authAPI');

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

// Model.find({}).exec()
//     .then((docs) => {
//         docs.forEach(function(hotel, index) {
//             const address = hotel.ADDRESS.replace(/["]+/g, '');
//             https.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=5SG40a8DgDDIML1neFDT&app_code=JQq-VvSFvrMhgETOWqK09A&searchtext=" + address, (resp) => {
//                 let data = '';
//                 resp.on('data', (chunk) => {
//                     data += chunk;
//                 });
//                 resp.on('end', () => {
//                     try {
//                      JSON.parse(data).Response.View.length;
//                         const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
//                         console.log(coordinates);
//                         Model.updateMany({ADDRESS: hotel.ADDRESS}, { Latitude: coordinates.Latitude, Longitude: coordinates.Longitude }, (err) => {});
//                     } catch(e) {}
//                 })
//             })
//         });
//     })


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
    const params = req.query;
    Model.find(params).exec()
        .then((data) => {
            res.json({ data });
        })
        .catch((err) => {
            next(new Error(err));
        });
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