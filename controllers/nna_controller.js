const nnaSchema = require('../models/nna_model').nna;
const nnaDEr

module.exports = {
	getNinos : (req, res) => {
		infanteSchema.findAll()
        .then(infa => {
            //console.log(infa)
            res.render('infante/infantes', {infa})
        })
        .catch(err => console.log(err))
	},

	getAgregarNino : (req, res) => {
		res.render('infante/add');
	},

	agregarNino: (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, escolaridad, ocupacion, sexo, fecha_nacimiento} = req.body;
		let errors  = [];
		if(!nombre){ errors.push({text : "Nombre es un campo obligatorio"}); }
		if(!exp){ errors.push({text : "Expediente es un campo obligatorio"}); }
		if(errors.length > 0){
			res.render('infante/add', {
				errors,
				nombre,
				app,
				apm,
				exp,
				escolaridad,
				ocupacion,
				sexo,
				fecha_nacimiento
			});
		}else{
			infante.create({
				nombre,
				app,
				apm,
				exp,
				escolaridad,
				ocupacion,
				sexo,
				fecha_nacimiento
			})
				.then(inf => res.redirect('/ninos'))
				.catch(err => console.log(err))
		}
	}
}