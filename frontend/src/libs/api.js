export const urlBase = import.meta.env.VITE_API_URL || '/api';  // AGREGAR EN ARCHIVO .gitignore para el trabajo final
export const headers = {};

export async function fetchApi(service, options) {
    options = {...options}; 
    options.headers = {...headers, ...options.headers};


    if(options.body){
        if (typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
        }

        options.headers['Content-Type'] ||= 'application/json'; // ( || ) comprueba false, null, 0, empty
    }

    if(options.json){
        options.headers.Accept = 'application/json';
    }

    let res = await fetch(`${urlBase}${service}`, options);

    if (!res.ok) {
        throw new Error('Resultado no deseado');
    }

    if (options.json) {
        if(!res.headers.get('Content-Type')?.startsWith('application/json')){
            throw new Error('El resultado no es JSON');
        }
        res = await res.json();
    }
    return res;
}

export async function post(service, body, options) {
    return await fetchApi(service, {...options, body, method: 'POST'});
}

export async function postJson(service, body, options) {
    return await post(service, body, {...options, json: true});
}