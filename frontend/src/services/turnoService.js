import { getJson, patchJson, postJson } from "../libs/api.js"; 

// Crear un nuevo turno
export async function createTurno(datos) {
    return await postJson('/turnos', datos);
}

// Devuelve los turnos del usuario por su ID
export async function getMisTurnos() {
    return await getJson('/turnos/my');
}

// Devuelve todos los turnos
export async function getAllTurnos() {
    return await getJson('/turnos/all');
}

// Actualiza los datos de un turno por su ID
export async function update(id, estado) {
    return await patchJson(`/turnos/${id}`, {estado});
}
