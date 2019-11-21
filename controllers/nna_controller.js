const nnaSchema = require('../models/nna_model').nna;

module.exports = {
	getNNAs : (req, res) => {
		nnaSchema.findAll()
        .then(nna => {
            //console.log(infa)
            res.render('nna/nnas', {nna})
        })
        .catch(err => console.log(err))
	},

	getAgregarNNA : (req, res) => {
		res.render('nna/add');
	},

	//post
	agregarNNA: (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, sexo, fecha_nacimiento} = req.body;
		nnaSchema.create({
			nombre,
			app,
			apm,
			exp,
			sexo,
			fecha_nacimiento
		})
			.then(inf => res.redirect('/nnas'))
			.catch(err => {
				//console.log(err);
				let errors_send  = [];
				for(let i = 0; i < err.errors.length; i++){
					errors_send.push({text:err.errors[i].message});
				}
				res.render('nna/add', {
					errors_send,
					nombre,
					app,
					apm,
					exp,
					sexo,
					fecha_nacimiento
				});
			})
	},

	getEditarNNA: (req, res) => {
		nnaSchema.findByPk(req.params.exp)
			.then(nna => {
				//console.log(nna)
				res.render('nna/add',{
					nickname:nna.nickname, nombre: nna.nombre, app : nna.app, apm : nna.apm,
					no_cedula : nna.no_cedula, role: nna.id_tipo
				});
			})
			.catch(err => console.log(err)); //modificacion en los params
	}
}