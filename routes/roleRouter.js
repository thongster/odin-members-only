const { Router } = require('express');
const roleRouter = Router();
const roleController = require('../controllers/roleController');

roleController.get('/membership', roleController.showMembership);

roleController.get('/admin', roleController.showAdmin);

module.exports = roleRouter;
