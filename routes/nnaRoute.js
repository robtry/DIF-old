const express = require('express');
const router = express.Router();
const nnaController = require('../controllers/nna_controller');
const {setValues} = require('../util/helpers');
//index
router.get('/nnas', nnaController.getNNAs);
//add
router.get('/nna/agregar', setValues, nnaController.getAgregarNNA);
router.post('/nna/agregar', setValues, nnaController.agregarNNA);
//editar
router.get('/nna/editar/:exp', setValues, nnaController.getEditNNA)
router.post('/nna/editar/:exp', setValues, nnaController.editNNA);
//Mostrar
router.get('/nna/:exp', setValues, nnaController.getNNA);
//delete
router.delete('/nna/:exp', nnaController.deleteNNA)



module.exports = router;