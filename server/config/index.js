require('dotenv').config('');
/*
	¿Qué se está haciendo aquí?
	* Creamos una variable (Por convencion las variables que no se van a reasignar o leer se declaran
	con const)  el cual es un objeto que tiene otro objeto dentro llamado server, el cual tiene como
	campos el hostname y el port, de esta manera lo declaramos una sola vez y no repetimos codigo.
*/

const config = {
  server: {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT
  },
  database: {
  	url: process.env.DB_REF
  }
};

module.exports = config;
// Esto se coloca al final para poder usarse esto como un modulo y hacerle el respectivo require, o almenos
// eso creo.

