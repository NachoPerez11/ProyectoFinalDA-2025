import { LoginService } from '../services/loginService.js';

export function login(app) {
    app.post('/login', async (req, res, next) => {
        try {
            const result = await LoginService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });
}