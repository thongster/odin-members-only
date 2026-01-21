const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

// authRouter.get('/');
authRouter.get('/sign-up', authController.showSignUp);
authRouter.post(
  '/sign-up',
  authController.validateUserSignUp,
  authController.signUp
);
authRouter.get('/log-in', authController.ShowLogIn);
authRouter.post(
  '/log-in',
  authController.validateUserLogIn,
  authController.logIn
);
authRouter.get('/log-out', authController.logOut);

module.exports = authRouter;
