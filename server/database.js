const mongoose = require('mongoose');
const logger = require('winston');

const config = require('./config');

exports.connect = () => {
  const {
    database,
  } = config;

  mongoose.connect(database.url, { useNewUrlParser: true });

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
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
};

/*
	- Importamos las librerías necesarias para hacer la conexión y dejar una constancia de los eventos, también cargamos
	  nuestra configuración.
	- Exportamos del módulo una función llamada connect que se encargará de realizar la conexión a la base de datos.
	- Dentro de la función tomamos solo la configuración correspondiente a la base de datos.
	- Invocamos la función de conexión a la base de datos
	- Creamos unos listeners para escuchar los eventos de la conexión, en este caso cuando la conexión fue exitosa, cuando se 
	  cerro la conexión o cuando hubo un error.
	- El último fragmento de código es un evento del sistema de Node JS que indica cuando se cerró la aplicación, puede ser 
	  debido a varias causas pero lo importante es que antes de cerrar la aplicación nos desconectamos de la base de datos 
	  para liberar esa conexión pues ya no se utilizará mas.

*/