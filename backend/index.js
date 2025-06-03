import express from 'express';
import { controllers } from './controllers/controllers.js';
import { errorHandlerMiddleware } from './middlewares/error_handler_middleware.js';
import { logMiddleware } from './middlewares/log_middleware.js';
import config from './config.js';
import { mongoose } from 'mongoose';
import configureDependencies from './configure_dependencies.js';'./configure_dependencies.js';

if (!config.jwtKey){
    console.error('No se ha definido un jwtKey en la configuracion. Por favor cree un archivo configlocal.js que contenga jwtKey.');
    process.exit(1);
}

mongoose.connect(config.dbConection).then(() => {
    console.log('Conexión establecida a MongoDB');
})
  .catch((error) => {
    console.error('Error al conectar a MongoDB: ', error);
});

const app = express();

const router = express.Router();
app.use('/api' , router);

router.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON (si no se envía en formato txt)
router.use(logMiddleware); // Middleware para log

controllers(router);

router.use(errorHandlerMiddleware);

configureDependencies();

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});