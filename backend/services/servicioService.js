import { getDependency } from '../libs/dependencies.js';
import { InvalidArgumentException } from '../exceptions/invalid_argument_exception.js';

export class ServicioService {
    // Devuelve todos los servicios activos
    static async getAllServices() {
        const Servicio = getDependency('ServicioModel');
        return await Servicio.find({ activo: true });
    }

    // Devuelve un servicio por su ID
    static async getServiceById(id) {
        const Servicio = getDependency('ServicioModel');
        const servicio = await Servicio.findById(id); 
        if (!servicio) {
            throw new Error('Servicio no encontrado');
        }
        return servicio;
    }

    // Actualiza un servicio existente
    static async updateService(id, serviceData) {
        const Servicio = getDependency('ServicioModel');
        return await Servicio.findByIdAndUpdate(id, serviceData, { new: true });
    }

    // Crea un nuevo servicio    
    static async createService(serviceData) {
        const Servicio = getDependency('ServicioModel');
        const { nombre, duracion, precio } = serviceData;
        
        if (!nombre || !duracion || !precio) {
            throw new InvalidArgumentException('Nombre, duración y precio son requeridos');
        }

        const servicio = new Servicio({ nombre, duracion, precio });
        return await servicio.save();
    }


    // Elimina un servicio (marca como inactivo)
    static async deleteService(id) {
        const Servicio = getDependency('ServicioModel');
        const servicio = await Servicio.findById(id);
        if (!servicio) {
            return null;
        }
        servicio.activo = false;
        return await servicio.save();
    }
}