const Model = require("./model");

exports.create = (req, res, next) => {
    res.json({});
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
		'ADDRESS': '',
		'STATE':  '',
		'PHONE': '',
		'FAX': '',
		'EMAIL ID': '',
		'WEBSITE': '',
		'TYPE': '',
		'Rooms': '',
		'Size': ''
	};
	const params = req.query;
	dataToSearch['HOTEL NAME'] = params.HOTEL_NAME;
	dataToSearch['ADDRESS'] = params.ADDRESS;
	dataToSearch['STATE'] = params.STATE
	dataToSearch['PHONE'] = params.PHONE
	dataToSearch['FAX'] = params.FAX
	dataToSearch['EMAIL ID'] = params.EMAIL_ID
	dataToSearch['WEBSITE'] = params.WEBSITE
	dataToSearch['TYPE'] = params.TYPE
	dataToSearch['Rooms'] = params.Rooms
	dataToSearch['Size'] = params.Size
	for (key in dataToSearch) {
		if(dataToSearch[key] === null || dataToSearch[key] === undefined || dataToSearch[key] === ''){
			delete dataToSearch[key]
		}
	}	
	Model.find(dataToSearch).exec()
		.then((data) =>{
    		res.json({data});
		})
		.catch((err) => {
			next(new Error(err));
		})
};

exports.update = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};