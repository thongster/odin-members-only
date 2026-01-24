const { Router } = require('express');
const roleRouter = Router();
const roleController = require('../controllers/roleController');

roleRouter.get('/membership', roleController.showMembership);
roleRouter.post('/membership', roleController.changeMembership);

roleRouter.get('/admin', roleController.showAdmin);
roleRouter.post('/admin', roleController.changeAdmin);

module.exports = roleRouter;
