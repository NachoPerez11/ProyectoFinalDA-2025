import { getJson, postJson } from "../libs/api.js";

export async function createTurno(datosTurno) {
    return await postJson('/turnos', datosTurno);
}

export async function getMisTurnos() {
    return await getJson('/turnos/my');
}