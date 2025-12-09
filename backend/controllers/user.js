import { UserService } from '../services/userService.js';
import { checkForRole } from '../middlewares/authorization_middleware.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export function user(app) {

    const checkOwnerOrAdmin = (req, res, next) => {
        // 1. Obtener token
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });
        try {
            // 2. Verificar token (quitando "Bearer ")
            const tokenLimpio = token.replace('Bearer ', '');
            const tokenDecodificado = jwt.verify(tokenLimpio, config.jwtKey);
            
            // 3. Guardamos el usuario en la request
            req.user = tokenDecodificado; 

            // 4. LÓGICA DE PERMISOS
            const esAdmin = tokenDecodificado.roles.includes('admin');
            const esDuenio = tokenDecodificado.uuid === req.params.uuid;

            if (esAdmin || esDuenio) {
                next();
            } else {
                return res.status(403).json({ message: 'No tenés permiso para realizar esta acción' });
            }

        } catch {
            return res.status(401).json({ message: 'Token inválido' });
        }
    };


    // Listar usuarios - Admin
    app.get('/users', checkForRole('admin'), async (req, res, next) => {
        try {
            const users = await UserService.get(req.query);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    });

    // Ver un usuario específico - Admin / Dueño
    app.get('/users/:uuid', checkOwnerOrAdmin, async (req, res, next) => {
        try {
            const user = await UserService.getByUuid(req.params.uuid);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });    

    // Crear usuario - Público
    app.post('/users', async (req, res, next) => {
        try {
            const newUser = await UserService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    });

    // Editar usuario - Admin / Dueño
    app.patch('/users/:uuid', checkOwnerOrAdmin, async (req, res, next) => {
        try {
            const updatedUser = await UserService.updateByUuid(req.params.uuid, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    });

    // Borrar usuario - Admin
    app.delete('/users/:uuid', checkForRole('admin'), async (req, res, next) => {
        try {
            await UserService.deleteByUuid(req.params.uuid);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });
}