const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');

messageRouter.get('/', messageController.showIndex);

module.exports = messageRouter;
