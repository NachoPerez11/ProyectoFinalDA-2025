import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { UserService } from './userService.js';
import { InvalidCredentialsException } from '../exceptions/invalid_credential_exception.js';

export class LoginService {
    
    static async login(credentials) {
        const { usuario, password } = credentials;

        const user = await UserService.getSingleOrNullByUsuario(usuario);

        if (!user) {
            throw new InvalidCredentialsException('Credenciales inválidas');
        }
        //const clave = bcrypt.hashSync(password, 10);

        const isPasswordValid = bcrypt.compareSync(password, user.claveHasheada);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException('Credenciales inválidas');
        }

        const payload = {
            _id: user._id,
            usuario: user.usuario,
            roles: user.roles
        };

        const token = jwt.sign(payload, config.jwtKey, { expiresIn: '8h' });

        const userResponse = {
            _id: user._id,
            usuario: user.usuario,
            roles: user.roles,
            nombre: user.nombre
        };

        return {
            message: 'Login exitoso',
            token: token,
            user: userResponse
        };
    }
}