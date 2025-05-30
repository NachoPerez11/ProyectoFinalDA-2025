/*
CREE UN ARCHIVO LOCAL LLAMADO configlocal.js 
DONDE COLOQUE LOS VALORES QUE NO SE ALMACENAN EN EL REPOSITORIO

var config = {
    jwtKey: '1234' // Aumentar complejidad
}

export default config;


*/

import configLocal from './configlocal.js';

var config = {
    port: 3000,
    ... configLocal,
}

export default config;