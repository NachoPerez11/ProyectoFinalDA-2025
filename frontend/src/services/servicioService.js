import { deleteJson, getJson, postJson } from "../libs/api.js";

// Devuelve todos los servicios
export async function getServicios() {
    return await getJson('/servicios');
}

// Devuelve un servicio por su ID
export async function getById(id) {
    return await getJson(`/servicios/${id}`);
}

// Crea un nuevo servicio
export async function createServicio(data) {
    return await postJson('/servicios', data);
}

// Actualiza un servicio existente
export async function update(id, data) {
    return await postJson(`/servicios/${id}`, data);
}

// Elimina un servicio por su ID
export async function deleteServicio(id) {
    return await deleteJson(`/servicios/${id}`);
}