const derechoSchema = require('../models/auxiliar_model').derecho;
const escolaridadSchema = require('../models/auxiliar_model').escolaridad;
const enfermedadSchema = require('../models/auxiliar_model').enfermedad;
const datoconstanteSchema = require('../models/plantilla_model').datoConst;

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
    },

    postDerechos : (req, res) => {
        let { articulo , derecho} = req.body;
        derechoSchema.create({
            articulo: articulo, 
            derecho: derecho
        }).then()
           .catch(err => { console.log(err)});
    },

    postEscolaridad: (req, res) => {
        let {  nivel } = req.body;
        escolaridadSchema.create({
            nivel : nivel
        }).then()
           .catch(err => { console.log(err)});
    },

    postEnfermedades: (req, res) => {
        let {  nombre } = req.body;
        enfermedadSchema.create({
           nombre : nombre
        }).then()
           .catch(err => { console.log(err)});
    },

    postDatosConstantes : (req, res) => {
		let {  dato, multivalor } = req.body;
        datoconstanteSchema.create({
           dato: dato,
           es_multivalor : multivalor

        }).then()
           .catch(err => { console.log(err)});
    }
    
}