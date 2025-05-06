import express from 'express';
import { controllers } from './controllers/controllers.js';

const app = express();

controllers(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});