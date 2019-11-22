const plantillaSchema =  require('../models/plantilla_model').plantilla;
const campoSchema =  require('../models/plantilla_model').campo;
const opcionSchema =  require('../models/opcion_model').opcion;
const formatoSchema =  require('../models/formato_model').formato;
const respuestaSchema =  require('../models/respuesta_model').respuesta;
const resopSchema =  require('../models/resop_model').resop;

const getTipo = require('./active_controller').getTipo;
const getRouteWithTipo = require('./active_controller').getRouteWithTipo;




module.exports = {

    getPlantillas: (role) => { 
		//only admins
		return (req, res) => {
			plantillaSchema.findAll({ where: { id_tipo : role} })
				.then(plantilla => {
					//console.log(usr)
					const tipo = getTipo(role);
					res.render('plantillas/plantillas', {usr, tipo, role})
				})
				.catch(err => console.log(err));
		}
	},
}