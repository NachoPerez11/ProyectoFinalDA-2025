import { getJson } from "../libs/api.js";

export async function get(username, password) {
    return await getJson('/user');
}