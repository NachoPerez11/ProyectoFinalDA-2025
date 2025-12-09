import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Confirmado', 'Eliminado'],
        default: 'Pendiente'
    }
}, { timestamps: true });

const Turno = mongoose.model('Turno', turnoSchema);
export default Turno;