const express = require('express');
const router = express.Router();
const auxiliarsController = require('../controllers/auxiliars_controller');

//index
router.get('/derechos', auxiliarsController.getDerechos);
router.post('/derechos', auxiliarsController.postDerechos);
router.get('/escolaridades', auxiliarsController.getEscolaridades);
router.post('/escolaridades', auxiliarsController.postEscolaridad);
router.get('/enfermedades', auxiliarsController.getEnfermedades);
router.post('/enfermedades', auxiliarsController.postEnfermedades);
router.get('/datosconstantes', auxiliarsController.getDatosConstantes);
router.post('/datosconstantes', auxiliarsController.postDatosConstantes);




module.exports = router;