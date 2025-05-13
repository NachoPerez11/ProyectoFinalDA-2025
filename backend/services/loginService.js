export class LoginService{
    static async login(credentials) {
        if(!credentials || !credentials.username || !credentials.password
        || typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
            return {
                error: 'Argumentos inválidos'
            };
        }

        if(credentials.username !== 'admin')
            return {
                error: 'Argumentos inválidos'
            };
            
        if(credentials.password !== "1234")
            return {
                error: 'Argumentos inválidos'
            };
        
        return {
            token:'Token de acceso'
            };
    }
}

