import { getJson } from "../libs/api.js";

// Devuelve la lista de todos los usuarios
export async function get() {
    return await getJson('/users');
}

// Devuelve un usuario por su UUID
export async function getByUuid(uuid) {
    return await getJson(`/users/${uuid}`);
}