const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');

messageRouter.get('/', messageController.showIndex);
messageRouter.get('/add-message', messageController.showAddMessage);
messageRouter.post(
  '/add-message',
  messageController.validateMessage,
  messageController.addMessage
);
messageRouter.post(
  '/delete-message/:message_id',
  messageController.deleteMessage
);

module.exports = messageRouter;
