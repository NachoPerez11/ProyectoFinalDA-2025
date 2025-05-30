import { login } from './login.js';
import { user } from './user.js';

export function controllers(app) {
    login(app);
    user(app);
    // Instala o llama a los controladores
    // Un archivo por controlador
}