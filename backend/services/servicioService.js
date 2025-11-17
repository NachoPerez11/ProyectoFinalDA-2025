import { getDependency } from '../libs/dependencies.js';
// Asumo que tienes esta excepción definida
import { InvalidArgumentException } from '../exceptions/invalid_argument_exception.js';

export class ServicioService {
    
    /**
     * Devuelve todos los servicios que están 'activos'
     */
    static async getAllServices() {
        const Servicio = getDependency('ServicioModel');
        // Busca usando tu campo 'activo'
        return await Servicio.find({ activo: true });
    }

    /**
     * Crea un nuevo servicio
     */
    static async createService(serviceData) {
        const Servicio = getDependency('ServicioModel');
        // Usa los campos en español de tu modelo
        const { nombre, duracion, precio } = serviceData;
        
        if (!nombre || !duracion || !precio) {
            throw new InvalidArgumentException('Nombre, duración y precio son requeridos');
        }

        const servicio = new Servicio({ nombre, duracion, precio });
        return await servicio.save();
    }
    
    /**
     * Busca un servicio por su ID
     */
    static async getServiceById(id) {
        const Servicio = getDependency('ServicioModel');
        return await Servicio.findById(id);
    }
}