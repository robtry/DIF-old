const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuario_controller');

//Ruta cuando se ingresa
router.get('/usuario', userController.getUsuario);
router.get('/usuarios', userController.getUsuarios);
router.get('/agregar_usuario', userController.getAgregarUsuario);
router.post('/agregar_usuario', userController.agregarUsuario);


module.exports = router;