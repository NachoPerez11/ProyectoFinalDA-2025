import express from 'express';
import {controllers} from '../controllers/controllers.js';
import {logMiddleware} from './log_middleware.js';
import {errorHandlerMiddleware} from './error_handler_middleware.js';
import {authorizationMiddleware} from './authorization_middleware.js';
import { corsHandler } from './cors_middleware.js';


export default function configureMiddleware(router){
	router.use(express.json()); // Middleware para parsear el cuerpo de las peticiones como JSON (si no se envía en formato txt)
    router.use(logMiddleware); // Middleware para logrouter.use(express.json());
	router.use(authorizationMiddleware); // Middleware para manejar la autorización de las peticiones
	router.use(corsHandler); // Middleware para manejar CORS
	controllers(router);
	
	router.use(errorHandlerMiddleware);
}