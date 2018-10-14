# INSTRUCCIONES DE USO 


Ejecutar el siguiente comando para traerse todas las dependencias que se estan usando en el proyecto.

Importante sino no va a correr la api.

```
npm install 
```

Crear un archivo con el nombre .env en la raiz del proyecto  donde se colocara 

``` 
	
	SERVER_HOSTNAME=localhost
	SERVER_PORT=3000
	DB_REF=mongodb://localhost/Hotel_Tourism

```
La base de datos debe llamarse Hotel_Tourism

Luego correr el servidor en el root del proyecto.

```

npm run dev 

```


Para correr en el servidor local el codigo que trae a cada hotel la latitud y longitud real de cada hotel hacer un GET a esta ruta

```  
localhost:3000/hotels/coordinates/findLatLong
```
Este proyecto corre utiliza los siguientes packetes

    "axios": "^0.16.2",
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.18.3",
    "cross-env": "^5.2.0",
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "jsonwebtoken": "^8.3.0",
    "mongoose": "^5.3.1",
    "morgan": "^1.9.1",
    "winston": "^3.1.0"


Importar el archivo variables de entorno en el postman 


## URL DE LA DOCUMENTACION 

[Documentacion ](https://documenter.getpostman.com/view/5284145/RWgozJwp) del código con todas las rutas.




