import express from 'express';
import config from './config.js';
import mongoose from 'mongoose';
import configureMiddleware from './middlewares/configure_middleware.js';
import configureDependencies from './configure_dependencies.js';

if (!config.jwtKey){
    console.error('No se ha definido un jwtKey en la configuracion. Por favor cree un archivo configlocal.js que contenga jwtKey.');
    process.exit(1);
}

mongoose.connect(config.dbConnection).then(() => {
    console.log('Conexión establecida a MongoDB');
})
  .catch((error) => {
    console.error('Error al conectar a MongoDB: ', error);
});

const app = express();

const router = express.Router();

app.use('/api', router);

configureMiddleware(router);
configureDependencies();

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});