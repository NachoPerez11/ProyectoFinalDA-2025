import { LoginService } from '../services/loginService.js';

export function login(app) {
    app.post('/login', async(req, res) => res.send(await LoginService.login(req.body)))
};