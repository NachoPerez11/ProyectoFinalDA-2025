export class ForbiddenException extends Error{
    constructor(){
        super('Permisos insuficientes');
        this.statusCode = 403;
    }
}