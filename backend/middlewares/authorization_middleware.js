import jwt from 'jsonwebtoken';
import config from '../config.js';
import { ForbiddenException } from '../exceptions/forbidden_exception.js';

export function authorizationMiddleware(req,res,next){
    const auth = req.headers.authorization;
    if(!auth){
        next();
        return;
    }
    
    const schema = auth.substring(0,6).toUpperCase();
    if(schema !== 'BEARER'){
        throw new Error('Invalid authorization Schema');
    }
    
    const token = auth.substring(7).trim();

    const data = jwt.verify(token, config.jwtKey);
    
    req.session = data; //Desde el endpoint de usuario puedo obtener a esta información
    next();
}

export function checkForRole(rol){
    return (req, res, next) => {
        if(req.session?.roles?.includes(rol)){
            next();
            return;
        }
        throw new ForbiddenException();
    };
}

