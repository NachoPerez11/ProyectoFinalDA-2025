export class ForbiddenException extends Error{
    constructor(msg){
        super(msg || 'Permisos insuficientes');
        this.statusCode = 403;
    }
}