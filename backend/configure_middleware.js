import express from 'express'; 
import {controllers} from './controllers/controllers.js';
import {logMiddleware} from './middlewares/log_middleware.js';
import {errorHandlerMiddleware} from './middlewares/error_handler_middleware.js';

export default function configureMiddleware(router){
	router.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON (si no se envía en formato txt)
    router.use(logMiddleware); // Middleware para logrouter.use(express.json());

	controllers(router);
	
	router.use(errorHandlerMiddleware);
}