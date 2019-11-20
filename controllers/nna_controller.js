const nnaSchema = require('../models/nna_model').nna;

module.exports = {
	getNnas : (req, res) => {
		nnaSchema.findAll()
        .then(nna => {
            //console.log(infa)
            res.render('nna/nnas', {nna})
        })
        .catch(err => console.log(err))
	},

	getAgregarNino : (req, res) => {
		res.render('nna/add');
	},

	agregarNino: (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, sexo, fecha_nacimiento} = req.body;
		let errors  = [];
		if(!nombre){ errors.push({text : "Nombre es un campo obligatorio"}); }
		if(!exp){ errors.push({text : "Expediente es un campo obligatorio"}); }
		if(errors.length > 0){
			res.render('nna/add', {
				errors,
				nombre,
				app,
				apm,
				exp,
				sexo,
				fecha_nacimiento
			});
		}else{	
			nnaSchema.create({
				nombre,
				app,
				apm,
				exp,
				sexo,
				fecha_nacimiento
			})
				.then(inf => res.redirect('/nnas'))
				.catch(err => console.log(err))
		}
	}
}