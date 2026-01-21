const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

// authRouter.get('/');
authRouter.get('/sign-up', authController.showSignUp);
authRouter.post('/sign-up', authController.validateUser, authController.signUp);
authRouter.get('/log-in', authController.ShowLogIn);
authRouter.post('/log-in', authController.logIn);
authRouter.get('/log-out', authController.logOut);

module.exports = authRouter;
