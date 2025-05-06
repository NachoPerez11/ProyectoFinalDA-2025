import { cuenta } from './cuenta.js';
import { hola } from './hola.js';
import { login } from './login.js';

export function controllers(app) {
    hola(app);
    cuenta(app);
    login(app);
    // Instala o llama a los controladores
    // Un archivo por controlador
}