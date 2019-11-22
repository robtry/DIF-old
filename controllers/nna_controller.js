const nnaSchema = require('../models/nna_model').nna;
const escolariadSchema = require('../models/auxiliar_model').escolaridad

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
		escolariadSchema.findAll()
			.then(esc => {
				res.render('nna/add', {esc})
			})
			.catch(err => console.log(err));
	},

	//post
	agregarNNA: (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, sexo, fecha_nacimiento, peso, talla, escolaridad} = req.body;
		nnaSchema.create({
			nombre,
			app,
			apm,
			exp,
			sexo,
			fecha_nacimiento,
			peso,
			talla,
			id_escolaridad : escolaridad
		})
			.then(inf => res.redirect('/nnas'))
			.catch(err => {
				//console.log(err);
				escolariadSchema.findAll()
					.then(esc => {						
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
							fecha_nacimiento,
							peso,
							talla,
							esc
						});
					});

			});
	},

	getEditNNA: (req, res) => {
		let {nombre, app, apm, exp, sexo, fecha_nacimiento} = req.body;

		nnaSchema.findByPk(req.params.exp)
			.then(nna => {
				//console.log(nna)
				res.render('nna/add',{
					nombre: nna.nombre, app : nna.app, apm : nna.apm,
					exp : nna.exp, sexo : nna.sexo, fecha_nacimiento : nna.fecha_nacimiento,  
				});
			})
			.catch(err => console.log(err)); //modificacion en los params
	},

	//post
	editNNA: (req, res) =>{
		let {nombre, app, apm, exp, sexo, fecha_nacimiento} = req.body;
		nnaSchema.findByPk(req.params.exp)
			.then(nna => {
				nna.nombre = nombre;
				nna.app = app;
				nna.apm = apm;
				nna.exp = exp;
				nna.sexo = sexo;
				nna.fecha_nacimiento = fecha_nacimiento;
				nna.save()
					.then(nna =>{
						res.redirect('/nnas');
					})
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
			})
			.catch(err => console.log(err)); //modificacion en los params
	}
}