const { Router } = require('express');
const roleRouter = Router();
const roleController = require('../controllers/roleController');

roleController.get('/membership', roleController.showMembership);
roleController.post('/membership', roleController.changeMembership);

roleController.get('/admin', roleController.showAdmin);
roleController.post('/admin', roleController.changeAdmin);

module.exports = roleRouter;
