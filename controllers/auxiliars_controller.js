const derechoSchema = require('../models/auxiliar_model').derecho;
const escolaridadSchema = require('../models/auxiliar_model').escolaridad;
const enfermedadSchema = require('../models/auxiliar_model').enfermedad;
const datoconstanteSchema = require('../models/plantillas_model').datoConsistente;

module.exports = {
	getDerechos : (req, res) => {
		derechoSchema.findAll()
        .then(derecho => {
            //console.log(infa)
            res.render('auxiliars/derechos', {derecho})
        })
        .catch(err => console.log(err))
    },
    getEscolaridades : (req, res) => {
		escolaridadSchema.findAll()
        .then(escolaridad => {
            //console.log(infa)
            res.render('auxiliars/escolaridades', {escolaridad})
        })
        .catch(err => console.log(err))
    },
    getEnfermedades : (req, res) => {
		enfermedadSchema.findAll()
        .then(enfermedad => {
            //console.log(infa)
            res.render('auxiliars/enfermedades', {enfermedad})
        })
        .catch(err => console.log(err))
    },
    getDatosConstantes : (req, res) => {
		datoconstanteSchema.findAll()
        .then(datoconstante => {
            //console.log(infa)
            res.render('auxiliars/datosconstantes', {datoconstante})
        })
        .catch(err => console.log(err))
    }
}