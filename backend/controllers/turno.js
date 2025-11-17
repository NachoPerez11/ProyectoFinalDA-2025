import { TurnoService } from '../services/turnoService.js';
// Importamos tu función real para chequear roles
import { checkForRole } from '../middlewares/authorization_middleware.js';

export function turno(app) {

    /**
     * @route GET /turnos/all
     * @description Devuelve TODOS los turnos de TODOS los clientes
     * @access Admin
     */
    app.get('/turnos/all', checkForRole('admin'), async (req, res, next) => {
        try {
            // Usamos el método estático
            const turnos = await TurnoService.getAllTurnos();
            res.status(200).json(turnos);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @route GET /turnos/my
     * @description Devuelve los turnos del cliente autenticado
     * @access Privado (requiere token)
     */
    app.get('/turnos/my', async (req, res, next) => {
        try {
            // Usamos req.session._id (de tu auth_middleware)
            const userId = req.session?._id; 
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            // Usamos el método estático
            const turnos = await TurnoService.getMisTurnos(userId);
            res.status(200).json(turnos);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @route POST /turnos
     * @description Crea un nuevo turno para el cliente autenticado
     * @access Privado (requiere token)
     */
    app.post('/turnos', async (req, res, next) => {
        try {
            const userId = req.session?._id;
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            
            // Usamos el método estático
            const newTurno = await TurnoService.createTurno(userId, req.body);
            res.status(201).json(newTurno);
        } catch (error) {
            next(error);
        }
    });
}