import { addDependency } from './libs/dependencies.js';
import { UserService } from './services/userService.js';
import { LoginService } from './services/loginService.js';
import { ServicioService } from './services/servicioService.js';
import { TurnoService } from './services/turnoService.js';
import UsuarioModel from './models/usuarioModel.js';
import ServicioModel from './models/servicioModel.js';
import TurnoModel from './models/turnoModel.js';


export default function configureDependencies() {
    addDependency('UserService', UserService);
    addDependency('LoginService', LoginService);
    addDependency('UsuarioModel', UsuarioModel);
    addDependency('ServicioModel', ServicioModel);
    addDependency('TurnoModel', TurnoModel);
    addDependency('ServicioService', ServicioService);
    addDependency('TurnoService', TurnoService);
};