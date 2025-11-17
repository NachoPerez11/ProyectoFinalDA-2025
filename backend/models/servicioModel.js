import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    duracion: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    activo: { // Soft delete
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Servicio = mongoose.model('Servicio', servicioSchema);
export default Servicio;