import { getJson } from "../libs/api.js";

export async function getServicios() {
    return await getJson('/servicios');
}