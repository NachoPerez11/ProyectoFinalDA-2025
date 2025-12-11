import { TurnoService } from '../services/turnoService.js';
import { checkForRole } from '../middlewares/authorization_middleware.js';

export function turno(app) {

    // ADMIN: Trae todos los turnos
    app.get('/turnos/all', checkForRole('admin'), async (req, res, next) => {
        try {
            const turnos = await TurnoService.getAllTurnos();
            res.status(200).json(turnos);
        } catch (error) {
            next(error);
        }
    });

    // CLIENTE: Trae sus turnos
    app.get('/turnos/my', async (req, res, next) => {
        try {
            const userId = req.session?._id; 
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            const turnos = await TurnoService.getMisTurnos(userId);
            res.status(200).json(turnos);
        } catch (error) {
            next(error);
        }
    });

    // Crear un nuevo turno
    app.post('/turnos', async (req, res, next) => {
        try {
            const userId = req.session?._id;
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            const newTurno = await TurnoService.createTurno(userId, req.body);
            res.status(201).json(newTurno);
        } catch (error) {
            next(error);
        }
    });

    // Actualizar un turno por ID (ADMIN)
    app.patch('/turnos/:id', checkForRole('admin'), async (req, res, next) => {
        try {
            const { id } = req.params;
            const { estado } = req.body;
            if(!estado){
                return res.status(400).json({ message: 'Estado requerido' });
            }
            const turnoEditado = await TurnoService.editarTurno(id, estado);
            res.status(200).json(turnoEditado);
        } catch (error) {
            next(error);
        }
    });
}