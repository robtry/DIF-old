const express = require('express');
const router = express.Router();
const nnaController = require('../controllers/nna_controller');

//Ruta cuando se ingresa
router.get('/nnas', nnaController.getNnas);
router.get('/nna/agregar', nnaController.getAgregarNino);
router.post('/nna/agregar', nnaController.agregarNino);



module.exports = router;