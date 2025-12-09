import { getDependency } from '../libs/dependencies.js';
// Asumo que tienes esta excepción definida
import { InvalidArgumentException } from '../exceptions/invalid_argument_exception.js';

export class TurnoService { 
    
    /**
     * (Admin) Devuelve todos los turnos
     */
    static async getAllTurnos() {
        const Turno = getDependency('TurnoModel');
        // Usa los refs y campos en español: 'cliente' y 'servicio'
        // Popula 'nombre' del cliente (de usuarioModel)
        return await Turno.find()
            .populate('cliente', 'nombre email') 
            .populate('servicio', 'nombre precio');
    }

    /**
     * (Cliente) Devuelve los turnos de un usuario específico
     */
    static async getMisTurnos(usuarioId) {
        const Turno = getDependency('TurnoModel');
        // Busca por 'cliente' y ordena por 'fecha'
        return await Turno.find({ cliente: usuarioId })
            .populate('servicio', 'nombre duracion precio')
            .sort({ fecha: 1 });
    }

    /**
     * (Cliente) Crea un nuevo turno
     */
    static async createTurno(usuarioId, datosTurno) {
        const Turno = getDependency('TurnoModel');
        const Servicio = getDependency('ServicioModel');
        
        const { servicioId, fecha } = datosTurno;
        if (!servicioId || !fecha) {
            throw new InvalidArgumentException('ID de servicio y fecha son requeridos');
        }

        const servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            throw new Error('Servicio no encontrado');
        }

        const turnoNuevo = new Turno({
            cliente: usuarioId,
            servicio: servicioId,
            fecha: new Date(fecha),
            estado: 'Pendiente' 
        });

        return await turnoNuevo.save();
    }
    
    /**
     * (Cliente) Cancela un turno
     */
    static async cancelarTurno(usuarioId, turnoId) {
        const Turno = getDependency('TurnoModel');
        const turno = await Turno.findOne({ _id: turnoId, cliente: usuarioId });
        
        if (!turno) {
            throw new Error('Turno no encontrado o no te pertenece');
        }
        turno.estado = 'Eliminado';
        return await turno.save();
    }
}