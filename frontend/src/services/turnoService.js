import { getJson, postJson } from "../libs/api.js";

// Crear un nuevo turno
export async function createTurno(datosTurno) {
    return await postJson('/turnos', datosTurno);
}

// Obtener los turnos del usuario actual
export async function getMisTurnos() {
    return await getJson('/turnos/my');
}

// Obtener todos los turnos (ADMIN)
export async function getAllTurnos() {
    return await getJson('/turnos/all');
}