export class InvalidCredentialsException extends Error{
    constructor(){
        super('Acceso prohibido');
        this.statusCode = 403;
    }
}