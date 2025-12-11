import { ServicioService } from '../services/servicioService.js';
import { checkForRole } from '../middlewares/authorization_middleware.js';

export function servicio(app) {
    // Crear un nuevo servicio (Admin)
    app.post('/servicios', checkForRole('admin'), async (req, res, next) => {
        try {
            const newServicio = await ServicioService.createService(req.body);
            res.status(201).json(newServicio);
        } catch (error) {
            next(error);
        }
    });

    // Obtener todos los servicios
    app.get('/servicios', async (req, res, next) => {
        try {
            const servicios = await ServicioService.getAllServices();
            res.status(200).json(servicios);
        } catch (error) {
            next(error);
        }
    });

    // Obtener un servicio por su ID 
    app.get('/servicios/:id', async (req, res, next) => {
        try {
            const {id} = req.params;
            const servicio = await ServicioService.getServiceById(id);
            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            res.status(200).json(servicio);
        } catch (error) {
            next(error);
        }
    });

    // Actualizar un servicio existente (Admin)
    app.post('/servicios/:id', checkForRole('admin'), async (req, res, next) => {
        try { 
            const updatedServicio = await ServicioService.updateService(req.params.id, req.body);
            if (!updatedServicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            res.status(200).json(updatedServicio);
        } catch (error) {
            next(error);
        }
    });

    // Eliminar un servicio (Admin)
    app.delete('/servicios/:id', checkForRole('admin'), async (req, res, next) => {
        try {
            const deleted = await ServicioService.deleteService(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            res.status(200).json({ message: 'Servicio eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    });
}