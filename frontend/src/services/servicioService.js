import { getJson, postJson } from "../libs/api.js";

export async function getServicios() {
    return await getJson('/servicios');
}

export async function createServicio(data) {
    // data debe ser { nombre, duracion, precio }
    return await postJson('/servicios', data);
}