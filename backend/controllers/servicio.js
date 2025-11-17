import { ServicioService } from '../services/servicioService.js';
import { checkForRole } from '../middlewares/authorization_middleware.js';

export function servicio(app) {
    /**
     * @route GET /servicios
     * @description Obtiene todos los servicios disponibles (peluquería, etc.)
     * @access Public
     */
    app.get('/servicios', async (req, res, next) => {
        try {
            // Usamos el método estático (como en tu login.js)
            const servicios = await ServicioService.getAllServices();
            res.status(200).json(servicios);
        } catch (error) {
            next(error); // Enviamos el error a tu error_handler_middleware
        }
    });

    /**
     * @route POST /servicios
     * @description Crea un nuevo servicio (peluquería, etc.)
     * @access Admin
     */
    app.post('/servicios', checkForRole('admin'), async (req, res, next) => {
        try {
            // Usamos el método estático
            const newServicio = await ServicioService.createService(req.body);
            res.status(201).json(newServicio);
        } catch (error) {
            next(error);
        }
    });
}