export class InvalidCredentialsException extends Error{
    constructor(msg){
        super(msg || 'Credenciales inválidas');
        this.statusCode = 401;
    }
}