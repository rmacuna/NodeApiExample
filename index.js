
/* 
	Seccion de imports de librerias necesarias para la creación del proyecto 
*/
	const http = require('http'); 
	const app = require('./server');
	const logger = require('winston');
	const config = require('./server/config');
/*
	¿Qué se está haciendo aquí?

	* Basicamente aqui lo que se pretende es traer lo que se importo del archivo config y guardarlo en una
	variable const la cual es un objeto ( Los objetos en JS son escritos abriendo {} el cual sus atributos
	son hostname, port)

	* Si echamos un vistazo a la carpeta server podemos ver que creamos un objeto con los atributos que aquí
	referenciamos ( una constante config con un atributo server el cual tieme como campos hostname y port )


	Nota: ¿Por qué se importa server/config en ves del archivo index.js? La respuesta es
	que se está utilizando un patron estandar el cual el primer archivo de cada carpeta o el entrypoint
	se debe llamar index.js y node reconoce esto, por esta razon en los import que llegen hasta el nombre de 
	la carpeta se interpretara que se quiere tomar  el index.js.


	* Utilizamos http para crear un servidor y le pasamos la variable app que tiene guardada la configuracion
	del servidor usando express. 

*/

	const { hostname, port } = config.server
	const server = http.createServer(app);

	server.listen(port, hostname, () => {
  		console.log(`Server running at http://${hostname}:${port}/`);
	});
/*
	Funcion que le pasa el puerto y el hostname creado arriba  y que nos arroja una respuesta 
	de que el servidor esta encendido 
*/