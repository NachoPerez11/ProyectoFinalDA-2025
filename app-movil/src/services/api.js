const API_URL = 'http://192.168.18.12:3000/api'; 

// Inicio de sesión
export const loginAPI = async (usuario, password) => {
    const response = await fetch(`${API_URL}/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
    }

    return await response.json(); 
};

// Obtener lista de usuarios (Admin)
export const getUsersAPI = async (token) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener usuarios. Verificá permisos.');
    }

    return await response.json();
};

// Obtener turnos del usuario autenticado
export const getTurnosAPI = async (token) => {
    try {
        const response = await fetch(`${API_URL}/turnos/my`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || 'Sin detalles'}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getServiciosAPI = async (token) => {
    const response = await fetch(`${API_URL}/servicios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Error al cargar servicios');
    }

    return await response.json();
};

// Crear un nuevo turno
export const crearTurnoAPI = async (token, datosTurno) => {
    const response = await fetch(`${API_URL}/turnos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosTurno),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al reservar turno');
    }

    return await response.json();
};