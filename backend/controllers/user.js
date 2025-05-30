import {UserService} from '../services/userService.js';

export function user(app){
    app.get('/user', async (req, res) => res.send(await UserService.get()))
};