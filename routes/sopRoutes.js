
const express = require('express');
const router = express.Router();
const sopController = require('../controllers/sopController');

router.post('/sops', sopController.createSop);
router.post('/steps', sopController.createStep);
router.get('/sops', sopController.getAllSops);
router.get('/sops/:sopId', sopController.getSopById);

module.exports = router;