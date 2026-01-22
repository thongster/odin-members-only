const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');

messageRouter.get('/', messageController.showIndex);
messageRouter.get('/add-message', messageController.showAddMessage);

module.exports = messageRouter;
