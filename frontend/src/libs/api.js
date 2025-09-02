export const urlBase = import.meta.env.VITE_API_URL || '/api';  // AGREGAR EN ARCHIVO .gitignore para el trabajo final
// AGREGAR ARCHIVO .env.local que tenga VITE_API_URL='https://localhost:5173'
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

    let query = '';
    if(options.query){
        if(typeof options.query === 'string'){
            query = options.query;
        } else {
            query = new URLSearchParams(options.query).toString();
        }
        if(query.length){
            query = `?${query}`;
        }
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

export async function get(service, query, options) {
    return await fetchApi(service, {...options, method: 'GET', query});
}

export async function postJson(service, body, options) {
    return await post(service, body, {...options, json: true});
}

export async function getJson(service, query, options) {
    return await get(service, query, {...options, json: true});
}