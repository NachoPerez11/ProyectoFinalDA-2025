import { getDependency } from '../libs/dependencies.js';
import bcrypt from 'bcrypt';

export class UserService {
    static async getSingleOrNullByUsername(username) {
        const users = getDependency('UserModel');
        return await users.findOne({ username: username });
    }

    static async get(filter){
        const UserModel = getDependency('UserModel');
        console.log(UserModel.find({}));
        return await UserModel.find(filter);
    }

    static async create(user) {
        if (!user.username){
            throw new InvalidArgumentError('Nombre de usuario requerido');
        }
        
        if(!user.fullName){
            throw new InvalidArgumentError('Nombre completo requerido'); 
        }
        
        if(!user.roles){
            throw new InvalidArgumentError('Roles requeridos');
        }

        if(!user.email){
            throw new InvalidArgumentError('Email requerido');
        }

        if(!user.password){
            throw new InvalidArgumentError('Contraseña requerida');
        }

        const UserModel = getDependency('UserModel');
        const existingUser = await UserModel.find({ username: user.username });
        if (existingUser.length > 0) {
            throw new Error('El nombre de usuario ya existe');
        }

        if(user.password){
            user.hashedPassword = bcrypt.hashSync(user.password, 10);
            delete user.password; // Eliminar la contraseña sin hashear
        }
        
        user.uuid = crypto.randomUUID(); // Generar un UUID único para el usuario
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    static async deleteByUuid(uuid) {
        if (!uuid) {
            throw new InvalidArgumentError('UUID requerido');
        }
        const UserModel = getDependency('UserModel');
        const user = await UserModel.findOneAndDelete({ uuid: uuid });
        if (!user) {
            throw new InvalidArgumentError('Usuario no encontrado');
        }
    }
};