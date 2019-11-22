const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuario_controller');

//index
router.get('/usuarios/medicos', userController.getUsuarios(2));
router.get('/usuarios/psicologos', userController.getUsuarios(3));
router.get('/usuarios/abogados', userController.getUsuarios(4));
//agregar
router.get('/medico/agregar', userController.getAddUsuario(2));
router.get('/psicologo/agregar', userController.getAddUsuario(3));
router.get('/abogado/agregar', userController.getAddUsuario(4));
//post agregar
router.post('/usuario/agregar', userController.addUsuario);
//editar
router.get('/usuario/editar/:id', userController.getEditUser);
router.post('/usuario/editar/:id', userController.editUser);
//delete
router.delete('/usuario/:id', userController.deleteUser);
module.exports = router;