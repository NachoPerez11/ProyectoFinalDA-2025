import { cuenta } from './cuenta.js';
import { hola } from './hola.js';

export function controllers(app) {
    hola(app);
    cuenta(app);
    // Instala o llama a los controladores
    // Un archivo por controlador
}