const express = require('express');
const router = express.Router();
const formatosController = require('../controllers/formato_controller');

//index
router.get('/tsocial/formatos', formatosController.getFormatos(1));
router.get('/medico/formatos', formatosController.getFormatos(2));
router.get('/psicologo/formatos', formatosController.getFormatos(3));
router.get('/abogado/formatos', formatosController.getFormatos(4));
//agregar
router.get('/formato/agregar/:id/:exp', formatosController.getAddFormato);
router.post('/formato/agregar/:id/:exp', formatosController.addFormato)

router.get('/formato/:id', formatosController.getFormato);
//editar
// router.get('/formatos/editar/:id', formatosController.getEditFormato);
// router.post('/formatos/editar/:id', formatosController.editFormato);


module.exports = router;