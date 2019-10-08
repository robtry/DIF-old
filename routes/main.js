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


/*router.get('/', (req, res) => 
    tipoformato.findAll()
        .then(infs => {
            console.log(infs);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
);*/

router.get('/', (req, res) => res.render('welcome'));
router.get('/login', (req, res) => res.render('login'));

router.get('/psicologia', (req, res) => res.render('psicologia'));
router.get('/psicologos', (req, res) => {
    psicologo.findAll()
        .then(psi => {
            console.log(psi)
            res.render('psicologia/psicologos', {psi})
        })
        .catch(err => console.log(err))
});
router.get('/agregar_psicologo', (req, res) => res.render('psicologia/add'));
router.post('agregar_psicologo', (req, res) => {
    res.redirect('/psicologos');
});

router.get('/infantes', (req, res) => {
    infante.findAll()
        .then(infa => {
            console.log(infa)
            res.render('infante/infantes', {infa})
        })
        .catch(err => console.log(err))
});
router.get('/formatos', (req, res) => {
    formato.findAll()
        .then(format => {
            console.log(format)
            res.render('formato/formatos', {format})
        })
        .catch(err => console.log(err))
});

//https://www.youtube.com/watch?v=67OhLlFPqFQ

module.exports = router;