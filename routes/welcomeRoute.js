const express = require('express');
const router = express.Router();
const welcomeController = require('../controllers/welcome_controller');

//Ruta cuando se ingresa
router.get('/', welcomeController.login);
router.get('/home', welcomeController.dashboard);

module.exports = router;