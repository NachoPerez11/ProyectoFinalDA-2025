import express from 'express';
import { controllers } from './controllers/controllers.js';
import { errorHandlerMiddleware } from './middlewares/error_handler_middleware.js';

const app = express();
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON

controllers(app);

app.use(errorHandlerMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});