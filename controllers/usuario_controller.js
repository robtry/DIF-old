const usuarioSchema = require('../models/usuario_model').User;

module.exports = {

	getUsuario: (req, res) => {
		//only admins
		res.render('usuario/index');
	},

	getUsuarios: (req, res) => { 
		usuarioSchema.findAll()
			.then(usr => {
				//console.log(usr)
				res.render('usuario/usuarios', {usr})
			})
			.catch(err => console.log(err))
	},

	getAgregarUsuario: (req, res) => { 
		res.render('usuario/add')
	},

	agregarUsuario: (req, res) => {
		let {nombre, app, apm, no_cedula} = req.body;
		let errors  = [];
		if(!nombre){ errors.push({text : "Nombre es un campo obligatorio"}); }
		if(errors.length > 0){
			res.render('psicologia/add', {
				errors,
				nombre,
				app,
				apm,
				no_cedula
			});
		}else{
			psicologo.create({
				nombre,
				app,
				apm,
				no_cedula,
				id_perfil : 1
			})
				.then(usr => res.redirect('/usuarios'))
				.catch(err => console.log(err))
		}
	},
}
