const express = require('express');
const router = express.Router();
const nnaController = require('../controllers/nna_controller');

//index
router.get('/nnas', nnaController.getNNAs);
//add
router.get('/nna/agregar', nnaController.getAgregarNNA);
router.post('/nna/agregar', nnaController.agregarNNA);
//editar
router.get('nna/editar/:exp')
router.post('nna/editar/:exp')



module.exports = router;