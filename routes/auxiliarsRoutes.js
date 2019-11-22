const express = require('express');
const router = express.Router();
const auxiliarsController = require('../controllers/auxiliars_controller');

//index
router.get('/derechos', auxiliarsController.getDerechos);
router.get('/escolaridades', auxiliarsController.getEscolaridad);
router.get('/enfermedades', auxiliarsController.getEnfermedad);
router.get('/datosconstantes', auxiliarsController.getDatosConstantes);




module.exports = router;