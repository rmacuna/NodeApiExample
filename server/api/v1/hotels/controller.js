const https = require('https');
const Model = require('./model');

exports.create = (req, res, next) => {
	console.log(req.body);
	res.json(req.body);
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
    //                     	JSON.parse(data).Response.View.length;
    //                         const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
    //                         console.log(coordinates);
    //                         Model.updateMany({ADDRESS: hotel.ADDRESS}, { Latitude: coordinates.Latitude, Longitude: coordinates.Longitude }, (err) => {});
    //                     } catch(e) {}
    //                 })
    //             })
    //         });
    //     })
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
    const dataToSearch = {
        'HOTEL NAME': '',
        ADDRESS: '',
        STATE: '',
        PHONE: '',
        FAX: '',
        'EMAIL ID': '',
        WEBSITE: '',
        TYPE: '',
        Rooms: '',
        Size: '',
        Latitude: '',
        Longitude: '',
    };
    const params = req.query;
    dataToSearch['HOTEL NAME'] = params.HOTEL_NAME;
    dataToSearch.ADDRESS = params.ADDRESS;
    dataToSearch.STATE = params.STATE;
    dataToSearch.PHONE = params.PHONE;
    dataToSearch.FAX = params.FAX;
    dataToSearch['EMAIL ID'] = params.EMAIL_ID;
    dataToSearch.WEBSITE = params.WEBSITE;
    dataToSearch.TYPE = params.TYPE;
    dataToSearch.Rooms = params.Rooms;
    dataToSearch.Size = params.Size;
    dataToSearch.Latitude  = params.Latitude;
    dataToSearch.Longitude = params.Longitude;
    for (key in dataToSearch) {
        if (dataToSearch[key] === null || dataToSearch[key] === undefined || dataToSearch[key] === '') {
            delete dataToSearch[key];
        }
    }
    Model.find(dataToSearch).exec()
        .then((data) => {
            res.json({ data });
        })
        .catch((err) => {
            next(new Error(err));
        });
};

exports.update = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};