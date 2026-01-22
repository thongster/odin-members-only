const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/authController');

messageRouter.get('/', messageController.showIndex);

module.exports = messageRouter;
