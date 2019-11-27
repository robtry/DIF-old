const express = require('express');

const searchController = require('../controllers/search_controller');


const router = express.Router();

router.post('/buscar/nna', searchController.buscarNNA);

module.exports = router;