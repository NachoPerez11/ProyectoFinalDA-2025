import { getDependency } from '../libs/dependencies.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { InvalidArgumentException } from '../exceptions/invalid_argument_exception.js';

export class UserService {

    // Busca un usuario por su nombre de 'usuario'
    static async getSingleOrNullByUsuario(username) {
        const Usuario = getDependency('UsuarioModel');
        return await Usuario.findOne({ usuario: username });
    }

    // Busca un usuario por su UUID
    static async getByUuid(uuid) {
        if (!uuid) {
            throw new InvalidArgumentException('UUID requerido');
        }
        const UsuarioModel = getDependency('UsuarioModel');
        const user = await UsuarioModel.findOne({ uuid: uuid });
        if (!user) {
            throw new InvalidArgumentException('Usuario no encontrado');
        }

        return {
            uuid: user.uuid,
            usuario: user.usuario,
            email: user.email,
            roles: user.roles,
            nombre: user.nombre
        };
    }

    //Devuelve todos los usuarios (para el admin)
    static async get(filter){
        const UsuarioModel = getDependency('UsuarioModel');
        return await UsuarioModel.find(filter);
    }

    // Crea un nuevo usuario
    static async create(user) {
        if (!user.usuario){
            throw new InvalidArgumentException('Nombre de usuario requerido');
        }
        if(!user.nombre){
            throw new InvalidArgumentException('Nombre completo requerido'); 
        }
        if(!user.roles || !user.email || !user.password){
             throw new InvalidArgumentException('Email, roles y contraseña son requeridos');
        }

        const UsuarioModel = getDependency('UsuarioModel');
        const existingUser = await UsuarioModel.find({ usuario: user.usuario });
        if (existingUser.length > 0) {
            throw new Error('El nombre de usuario ya existe');
        }
        if(user.password){
            user.claveHasheada = bcrypt.hashSync(user.password, 10);
            delete user.password;
        }
        
        user.uuid = crypto.randomUUID();
        const newUser = new UsuarioModel(user);
        await newUser.save();
        return newUser;
    }

    // Borra un usuario por su UUID
    static async deleteByUuid(uuid) {
        if (!uuid) {
            throw new InvalidArgumentException('UUID requerido');
        }
        const UsuarioModel = getDependency('UsuarioModel');
        const user = await UsuarioModel.findOneAndDelete({ uuid: uuid });
        if (!user) {
            throw new InvalidArgumentException('Usuario no encontrado');
        }
    }
};