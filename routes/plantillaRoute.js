const express = require('express');
const router = express.Router();
const plantillaController = require('../controllers/plantilla_controller');

//index
router.get('/tsocial/plantillas', plantillaController.getPlantillas(1));
router.get('/medico/plantillas', plantillaController.getPlantillas(2));
router.get('/psicologo/plantillas', plantillaController.getPlantillas(3));
router.get('/abogado/plantillas', plantillaController.getPlantillas(4));
//agregar
router.get('/tsocial/plantilla/agregar', plantillaController.getAddPlantilla(1));
router.get('/medico/plantilla/agregar', plantillaController.getAddPlantilla(2));
router.get('/psicologo/plantilla/agregar', plantillaController.getAddPlantilla(3));
router.get('/abogado/plantilla/agregar', plantillaController.getAddPlantilla(4));
router.post('/plantilla/agregar', plantillaController.addPlantilla)
//editar
router.get('/plantilla/editar/:id', plantillaController.getEditPlantilla);
router.post('/plantilla/editar/:id', plantillaController.editPlantilla);
//delete
router.delete('/plantilla/:id', plantillaController.deletePlantilla);

//fields
router.delete('/plantilla/campo/:id', plantillaController.deleteCampo);

module.exports = router;