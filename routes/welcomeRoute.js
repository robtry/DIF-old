const express = require('express');
const router = express.Router();
const welcomeController = require('../controllers/welcome_controller');
const nnasController = require('../controllers/nna_controller')

//Ruta cuando se ingresa
router.get('/', welcomeController.login);
router.get('/home', nnasController.getNNAs);

module.exports = router;