import { UserService } from '../services/userService.js';
import { checkForRole } from '../middlewares/authorization_middleware.js';

export function user(app) {

    // GET /users - (Solo Admin) Ver todos los usuarios
    app.get('/users', checkForRole('admin'), async (req, res, next) => {
        try {
            const users = await UserService.get(req.query); // req.query para filtros
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    });

    // POST /users - (Solo Admin) Crear un usuario
    app.post('/users', checkForRole('admin'), async (req, res, next) => {
        try {
            const newUser = await UserService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    });

    // DELETE /users/:uuid - (Solo Admin) Borrar un usuario
    app.delete('/users/:uuid', checkForRole('admin'), async (req, res, next) => {
        try {
            await UserService.deleteByUuid(req.params.uuid);
            res.status(204).send(); // 204 = No Content (Éxito sin respuesta)
        } catch (error) {
            next(error);
        }
    });
}