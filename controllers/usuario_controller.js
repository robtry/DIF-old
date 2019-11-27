const usuarioSchema = require('../models/usuario_model').User;
const formatoSchema = require('../models/plantilla_model').formato;
const plantillaSchema = require('../models/plantilla_model').plantilla

const getTipo = require('./active_controller').getTipo;
const getUserRoute = require('./active_controller').getUserRoute;
const getErrorMessages = require('./active_controller').getErrorMessages;

/*
	show es para ver el pass y el div de agregar | solo es true en agregar
	route es la dirección que tiene que seguir   | para seguir editando o agregando
	btn_info es el texto que despliega el botón  | editar y agregar
*/

module.exports = {
	//only admins

	getUsuario : (req, res) => {
		  
		//https://sequelize.org/master/manual/models-usage.html#eager-loading
		usuarioSchema.findByPk(req.params.id, {
				include: [
					{
						model: formatoSchema,
						include: [
			  				{
								model: plantillaSchema, required: false
							}
						]
					}]
			}) 
			.then(user => {
				console.log(user);
				res.render('usuario/show',{
					nickname:user.nickname, nombre: user.nombre, app : user.app, apm : user.apm,
					no_cedula : user.no_cedula, role: user.id_tipo, formatos: user.Formatos
				});
			})
			.catch(err => console.log("--Error in Get Edit--\n" + err));
	},

	getUsuarios: (role) => {
		return (req, res) => {
			usuarioSchema.findAll({ where: { id_tipo : role} })
				.then(usr => {
					const tipo = getTipo(role);
					res.render('usuario/usuarios', {usr, tipo, role})
				})
				.catch(err => console.log("--Error in Getting--\n" + err));
		}
	},

	getAddUsuario: (role) => {
		const tipo = getTipo(role);
		return (req, res) => {
			res.render('usuario/add', {show:true, tipo, role, route:'/usuario/agregar', btn_info:'Agregar'})
		}
	},

	//post
	addUsuario:  (req, res) => {
		let {nombre, app, apm, no_cedula, nickname, password, role, kind} = req.body;
		usuarioSchema.create({
			nickname, pass: password, nombre,
			app, apm, no_cedula,
			id_tipo: role
		})
			.then(() => {  res.redirect(getUserRoute(role, getTipo)); }) //create user
			.catch(err => {
				const errors_send = getErrorMessages(err);
				res.render('usuario/add', {
					route:"/usuario/agregar", show:true, errors_send,
					nombre, app, apm,
					no_cedula, nickname, password : "",
					role, tipo: kind, btn_info:'Agregar'
				});
			});
	},

	getEditUser:  (req, res) => {
		usuarioSchema.findByPk(req.params.id)
			.then(user => {
				res.render('usuario/add',{
					show:false,	route:"/usuario/editar/" + user.id,
					nickname:user.nickname, nombre: user.nombre, app : user.app, apm : user.apm,
					no_cedula : user.no_cedula, role: user.id_tipo, btn_info:'Actualizar'
				});
			})
			.catch(err => console.log("--Error in Get Edit--\n" + err));
	},

	editUser: (req, res) => {
		let {nombre, app, apm, no_cedula, nickname, role} = req.body;
		usuarioSchema.findByPk(req.params.id)
			.then(user => { // findbypk
				user.nombre = nombre;
				user.app = app;
				user.apm = apm;
				user.no_cedula = no_cedula;
				user.nickname = nickname;
				user.save()
					.then(() => { res.redirect(getUserRoute(role, getTipo));})
					.catch(err =>{
						const errors_send = getErrorMessages(err);
						res.render('usuario/add', {
							route:"/usuario/editar/" + user.id, show:false,
							errors_send, nombre, app, apm,
							no_cedula, nickname, role, btn_info:'Actualizar'
						});
					});
			})
			.catch(err => console.log("--Error in Post Edit --\n" + err));
	},

	deleteUser: (req, res) => {
		usuarioSchema.destroy({where:{id: parseInt(req.params.id)}})
			.then(() => res.send('Successttt'))
			.catch(err => console.log("--Error in Deleting" + err));
	}

}