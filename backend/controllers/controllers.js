import { login } from './login.js';
import { user } from './user.js';
import { servicio } from './servicio.js';
import { turno } from './turno.js';

export function controllers(app) {
    login(app);
    user(app);
    servicio(app);
    turno(app);
    // Instala o llama a los controladores
    // Un archivo por controlador
}

