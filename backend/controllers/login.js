import { loginService } from '../services/loginService.js';

export function login(app) {
    app.post('/login', (req, res) => {
        const result = loginService(
            req.body?.username, // ? Si existe body, enviame username
            req.body?.password // ? Si existe body, enviame password
        );
        res.send(result);
    });
}