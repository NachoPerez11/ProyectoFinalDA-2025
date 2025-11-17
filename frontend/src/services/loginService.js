import { postJson } from "../libs/api.js";

export async function login(usuario, password) {
    return await postJson('/login', { usuario, password });
}