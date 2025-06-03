import { addDependency } from './libs/dependencies.js';
import { UserService } from './services/userService.js';
import { LoginService } from './services/loginService.js';
import UserModel from './models/userModel.js';


export default function configureDependencies() {
    addDependency('UserService', UserService);
    addDependency('LoginService', LoginService);
    addDependency('UserModel', UserModel);
};