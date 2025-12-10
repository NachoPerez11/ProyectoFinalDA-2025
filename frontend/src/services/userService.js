import { getJson, patchJson, postJson, deleteJson } from "../libs/api.js"; 

// Devuelve la lista de todos los usuarios
export async function get() {
    return await getJson('/users');
}

// Devuelve los datos de un usuario por su UUID
export async function getByUuid(uuid) {
    return await getJson(`/users/${uuid}`);
}

// Actualiza los datos de un usuario por su UUID
export async function update(uuid, data) {
    return await patchJson(`/users/${uuid}`, data);
}

// Crea un nuevo usuario
export async function create(data) {
    return await postJson('/users', data);
}

export async function remove(uuid) {
    return await deleteJson(`/users/${uuid}`);
}