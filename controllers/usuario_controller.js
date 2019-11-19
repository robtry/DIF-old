const usuarioSchema = require('../models/usuario_model').User;

function getTipo(role){
	if(role == 2){return "Médico"}
	else if(role == 3){return "Psicólogo"}
	else if(role == 4){return "Abogado"}
	else return ''
}

function getRouteWithTipo(role){
	return '/usuarios/' + getTipo(role).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() + 's';
}


module.exports = {

	getUsuarios: (role) => { 
		//only admins
		return (req, res) => {
			usuarioSchema.findAll({ where: { id_tipo : role} })
				.then(usr => {
					//console.log(usr)
					const tipo = getTipo(role);
					res.render('usuario/usuarios', {usr, tipo, role})
				})
				.catch(err => console.log(err))
		}
	},

	getAddUsuario: (role) => {
		const tipo = getTipo(role);
		return (req, res) => {
			res.render('usuario/add', {tipo, role})
		}
	},

	//post
	addUsuario:  (req, res) => {

		let {nombre, app, apm, no_cedula, nickname, password, role, tipo} = req.body;
		let errors  = [];
		if(!nombre){ errors.push({text : "Nombre es un campo obligatorio"}); }
		if(!app){ errors.push({text : "Apellido paterno es un campo obligatorio"}); }
		if(!apm){ errors.push({text : "Apellido materno es un campo obligatorio"}); }
		if(!no_cedula){ errors.push({text : "Cédula es un campo obligatorio"}); }
		if(!password){ errors.push({text : "Es necesario ingresar una contraseña"}); }
		if(!nickname){ errors.push({text : "Debe ingresar un nickname"}); }

		if(errors.length > 0){
			res.render('usuario/add', {
				errors,
				nombre,
				app,
				apm,
				no_cedula,
				nickname,
				password : "",
				role,
				tipo
			});
		}else{
			usuarioSchema.create({
				nickname,
				pass: password,
				nombre,
				app,
				apm,
				no_cedula,
				id_tipo: role
			})
				.then(usr => { res.redirect(getRouteWithTipo(role)); })
				.catch(err => console.log(err))
		}
	},

	deleteUser: (req, res) => {
		console.log(req.params.id);
		//console.log(req.body['role']);
		//const tipo = getRouteWithTipo(req.body['role']);
		usuarioSchema.destroy({where:{id: parseInt(req.params.id)}})
			.then(succ => res.send('Success'))
			.catch(err => console.log(err)
			);
	}
}
