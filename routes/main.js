const express = require('express');
const router = express.Router();
const db = require('../config/database');
//Models
const infante = require('../models/dif_psicologia').Infante;
const psicologo = require('../models/dif_psicologia').Psicologo;
const formato = require('../models/dif_psicologia').Formato;
const psifor = require('../models/dif_psicologia').PsiFor;
const pregunta = require('../models/dif_psicologia').Pregunta;
const opcion = require('../models/dif_psicologia').Opcion;
const tipoformato = require('../models/dif_psicologia').TipoFormato;

router.get('/', (req, res) => 
    tipoformato.findAll()
        .then(infs => {
            console.log(infs);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
);

module.exports = router;