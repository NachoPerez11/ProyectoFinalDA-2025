import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uuid: String,
    usuario: { type: String, required: true, unique: true },
    claveHasheada: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['user'] },
    nombre: { type: String }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', userSchema);
export default Usuario;