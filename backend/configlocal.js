// Este archivo es una configuración local que se debe crear en el directorio backend para definir la clave JWT y la conexión a la base de datos.
// Si no se define jwtKey, el servidor no arrancará y mostrará un mensaje de error.
// Agregarlo a .gitignore para evitar subirlo al repositorio. (A la hora de hacer el trabajo final)
// ES IMPORTANTE: Este archivo no debe ser subido al repositorio, ya que contiene información sensible. 

var config = {
    jwtKey: '1234', // Aumentar complejidad
    dbConection: 'mongodb://localhost:27017'
}

export default config;