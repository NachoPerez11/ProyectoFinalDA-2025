import express from 'express';
import config from './config.js';
import mongoose from 'mongoose';
import configureMiddleware from './middlewares/configure_middleware.js';
import configureDependencies from './configure_dependencies.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.use(cors());
app.use(express.json());

const router = express.Router();
app.use('/api', router);

configureMiddleware(router);
configureDependencies();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
//app.get(/.*/, (req, res) => {
//  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//});

app.listen(config.port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});