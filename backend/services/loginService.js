import { InvalidArgumentException } from "../exceptions/invalid_argument_exception.js";
import { InvalidCredentialsException } from "../exceptions/invalid_credential_exception.js";
import { getDependency } from "../libs/dependencies.js";
import bcrypt from 'bcrypt';

export class LoginService{
    static async login(credentials) {
        if(!credentials || !credentials.username || !credentials.password
        || typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
            throw new InvalidArgumentException();
        }

        const UserService = getDependency('UserService');
        const user = await UserService.getSingleOrNullByUsername(credentials.username);
        if(!user) throw new InvalidCredentialsException();

        if(credentials.password !== user.password) throw new InvalidCredentialsException();


        // NO SE USA
        //const hash = bcrypt.hashSync("1234", 2);
        //console.log(hash);

        if(!(await bcrypt.compare(credentials.password, user.hashedPassword)))
            throw new InvalidCredentialsException;
        
        return {
            token: 'Token de acceso'
        };
    }
}

