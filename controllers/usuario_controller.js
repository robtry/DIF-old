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
				.catch(err => console.log(err));
		}
	},

	getAddUsuario: (role) => {
		const tipo = getTipo(role);
		return (req, res) => {
			res.render('usuario/add', {show:true, tipo, role, route:"/usuario/agregar"})
		}
	},

	//post
	addUsuario:  (req, res) => {
		let {nombre, app, apm, no_cedula, nickname, password, role, kind} = req.body;
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
			.catch(err => {
				let errors_send  = [];
				for(let i = 0; i < err.errors.length; i++){
					//console.log(err.errors[i].message)
					errors_send.push({text:err.errors[i].message});
				}
				//console.log(errors_send)
				res.render('usuario/add', {
					route:"/usuario/agregar",
					show:true,
					errors_send,
					nombre,
					app,
					apm,
					no_cedula,
					nickname,
					password : "",
					role,
					tipo: kind
				});
			});
	},
	getEditUser:  (req, res) => {
		usuarioSchema.findByPk(req.params.id)
			.then(user => {
				//console.log(user)
				res.render('usuario/add',{show:false,
					route:"/usuario/editar/" + user.id,
					nickname:user.nickname, nombre: user.nombre, app : user.app, apm : user.apm,
					no_cedula : user.no_cedula, role: user.id_tipo
				});
			})
			.catch(err => console.log(err)); //modificacion en los params
	},

	editUser: (req, res) =>{
		let {nombre, app, apm, no_cedula, nickname, role} = req.body;
		usuarioSchema.findByPk(req.params.id)
			.then(user => {
				user.nombre = nombre;
				user.app = app;
				user.apm = apm;
				user.no_cedula = no_cedula;
				user.nickname = nickname;
				user.save()
					.then( user => {
						res.redirect(getRouteWithTipo(role));
					})
					.catch(err =>{
						let errors_send  = [];
						for(let i = 0; i < err.errors.length; i++){errors_send.push({text:err.errors[i].message});}
						res.render('usuario/add', {
							route:"/usuario/editar/" + user.id,
							show:false,
							errors_send,
							nombre,
							app,
							apm,
							no_cedula,
							nickname,
							role
						});
					});
			})
			.catch(err => console.log(err));
	},

	deleteUser: (req, res) => {
		console.log(req.params.id);
		//console.log(req.body['role']);
		//const tipo = getRouteWithTipo(req.body['role']);
		usuarioSchema.destroy({where:{id: parseInt(req.params.id)}})
			.then(succ => res.send('Success'))
			.catch(err => console.log(err));
	}
}
