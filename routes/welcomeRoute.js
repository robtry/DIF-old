const express = require('express');
const router = express.Router();
const welcomeController = require('../controllers/welcome_controller');

//Ruta cuando se ingresa
router.get('/', welcomeController.welcome);
router.get('/login', welcomeController.login);


module.exports = router;