const mongoose = require('mongoose');
const logger = require('winston');
const config = require('./config');


exports.connect = () => {

	const {
		database
	} = config;

	mongoose.connect(database.url);

	mongoose.connection.on('open', ()=> {
		console.log('Database connected');
	});
	mongoose.connection.on('close', () => {
    	logger.info('Database disconnected');
 	 });
	mongoose.connection.on('error', (err) => {
    	logger.error(`Database connection error: ${err}`);
  	});

  	process.on('SIGINT', () => {
    	mongoose.connection.close(() => {
      	logger.info('Database connection disconnected through app termination');
      	process.exit(0);
    	});
  	});

}
