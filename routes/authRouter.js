const { Router } = require('express');
const authRouter = Router();

authRouter.get('/');
authRouter.get('/sign-up');
authRouter.post('/sign-up');
authRouter.post('/log-in');
authRouter.get('/log-out');

module.exports = authRouter;
