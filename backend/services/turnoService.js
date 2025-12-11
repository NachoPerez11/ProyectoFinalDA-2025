import { getDependency } from '../libs/dependencies.js';
import { InvalidArgumentException } from '../exceptions/invalid_argument_exception.js';

export class TurnoService { 
    
    // (Admin) Devuelve todos los turnos
    static async getAllTurnos() {
        const Turno = getDependency('TurnoModel');
        return await Turno.find()
            .populate('cliente', 'nombre email') 
            .populate('servicio', 'nombre precio');
    }

    // (Cliente) Devuelve los turnos de un usuario específico
    static async getMisTurnos(usuarioId) {
        const Turno = getDependency('TurnoModel');
        // Busca por 'cliente' y ordena por 'fecha'
        return await Turno.find({ cliente: usuarioId })
            .populate('servicio', 'nombre duracion precio')
            .sort({ fecha: 1 });
    }

    // Crea un nuevo turno
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

    // (Cliente) Editar el estado de un turno
    static async editarTurno(turnoId, estado) {
        const Turno = getDependency('TurnoModel');
        const turno = await Turno.findOne({ _id: turnoId });
        
        if (!turno) {
            throw new Error('Turno no encontrado');
        }
        turno.estado = estado;
        return await turno.save();
    }
}