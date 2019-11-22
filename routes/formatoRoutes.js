const express = require('express');
const router = express.Router();
const formatosController = require('../controllers/formato_controller');

//index
router.get('/tsocial/formatos', formatosController.getFormatos(1));
router.get('/medico/formatos', formatosController.getFormatos(2));
router.get('/psicologo/formatos', formatosController.getFormatos(3));
router.get('/abogado/formatos', formatosController.getFormatos(4));
//agregar
router.get('/tsocial/formatos/agregar', formatosController.getAddFormato(1));
router.get('/medico/formatos/agregar', formatosController.getAddFormato(2));
router.get('/psicologo/formatos/agregar', formatosController.getAddFormato(3));
router.get('/abogado/formatos/agregar', formatosController.getAddFormato(4));
router.post('/formatos/agregar', formatosController.addFormato)
//editar
router.get('/formatos/editar/:id', formatosController.getEditFormato);
router.post('/formatos/editar/:id', formatosController.editFormato);

module.exports = router;