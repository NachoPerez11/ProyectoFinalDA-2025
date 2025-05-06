export function loginService(username, password) {
    if(!username || !password) {
        return {
            error: 'Argumentos inválidos'
        };
    }    
    if(username !== 'admin')
        return {
            error: 'Argumentos inválidos'
        };
        
    if(password !== "1234")
        return {
            error: 'Argumentos inválidos'
        };
    return {

        token:'Token de acceso'
    };
}