const plantillaSchema =  require('../models/plantilla_model').plantilla;
const campoSchema =  require('../models/plantilla_model').campo;
const datoCteSchema = require('../models/plantilla_model').datoConst;
/*
const opcionSchema =  require('../models/opcion_model').opcion;
const formatoSchema =  require('../models/formato_model').formato;
const respuestaSchema =  require('../models/respuesta_model').respuesta;
const resopSchema =  require('../models/resop_model').resop;
*/

const getTipo = require('./active_controller').getTipo;
const getAddPlantillaRoute = require('./active_controller').getAddPlantillaRoute;


module.exports = {

    getPlantillas: (role) => { 
		//only admins
		return (req, res) => {
			plantillaSchema.findAll({ where: { id_tipo : role} })
				.then(plantilla => {
					//console.log(usr)
					const tipo = getTipo(role);
					const add_route =  getAddPlantillaRoute(role);
					res.render('plantilla/plantillas', {plantilla, tipo, role, add_route})
				})
				.catch(err => console.log(err));
		}
	},

	getAddPlantilla: (role) => {
		const tipo = getTipo(role);
		return (req, res) => {
			res.render('plantilla/add', {tipo, role, route: "/plantilla/agregar", editing:false, accion:"Crear"});
		}
	},

	addPlantilla:  (req, res) => {
		let {nombre, descripcion, role, tipo} = req.body;
		descripcion = (descripcion == '') ? null : descripcion;
		//console.log(descripcion)
		plantillaSchema.create({
			id_tipo : role,
			nombre,
			descripcion
		})
			.then(p => {
				res.redirect(getAddPlantillaRoute(role))
			})
			.catch(err => {
				let errors_send  = [];
				for(let i = 0; i < err.errors.length; i++){
					errors_send.push({text:err.errors[i].message});
				}
				res.render('plantilla/add', {
					tipo, role, route: "/plantilla/agregar",
					errors_send, nombre, descripcion,
					editing:false, accion:"Crear"
				});
			});
	},

	getEditPlantilla: (req, res) => {
		plantillaSchema.findByPk(req.params.id, {include: [ campoSchema ]})
			.then(p => {
				//console.log(p)
				datoCteSchema.findAll()
					.then(datos => {
						res.render('plantilla/add', {
							route: "/plantilla/editar/" + p.id, editing:true, accion:"Actualizar",
							role : p.id_tipo, nombre : p.nombre, descripcion : p.descripcion,
							campos : p.Campos, datos
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err))
	},

	editPlantilla: (req, res) => {
		//console.log(req.body);
		let {nombre,descripcion,role,tipo,//
			campo,info_llenado,es_cerrada,es_cte,es_archivo,//
			opciones,campo_pos} = req.body;

		descripcion = (descripcion == '') ? null : descripcion;
		info_llenado = (info_llenado == '') ? null : info_llenado;
		es_cerrada = (es_cerrada) ? true : false;
		es_cte = (es_cte) ? true : false;
		es_archivo = (es_archivo) ? true : false;
		opciones = (opciones == '') ? null : opciones;
		campo_pos = (campo_pos == '') ? null : campo_pos;

		plantillaSchema.findByPk(req.params.id)
			.then(p => {
					p.nombre = nombre,
					p.descripcion = descripcion,
	
					p.save()			
					.then(pNew => {
						//simepre se va a crear
						campoSchema.create({
							id_plantilla : pNew.id,
							pregunta : campo,
							info_llenado,
							es_cerrada,
							es_consistente : es_cte,
							es_archivo,
							id_dato_consistente : campo_pos
						}).then(newCamp =>{
							datoCteSchema.findAll()
								.then(datos => {
									res.render('plantilla/add', {
										route: "/plantilla/editar/" + pNew.id, editing:true, accion:"Actualizar",
										role : pNew.id_tipo, nombre : pNew.nombre, descripcion : pNew.descripcion,
										campos : pNew.Campos, datos
									});
								})
								.catch(err => console.log(err));
						})
						.catch(err => {
							let errors_send  = [];
							for(let i = 0; i < err.errors.length; i++){
								errors_send.push({text:err.errors[i].message});
							}
							datoCteSchema.findAll()
							.then(datos => {
								res.render('plantilla/add', {
									route: "/plantilla/editar/" + p.id, editing:true, accion:"Actualizar",
									role : p.id_tipo, nombre, descripcion,
									campos : p.Campos, datos, errors_send,
									campo, info_llenado, opciones,
									es_cerrada_chk : (es_cerrada) ? "checked" : '',
									es_cte_chk : (es_cte) ? "checked" : '',
									es_archivo_chk : (es_archivo) ? "checked" : '',
								});
							})
							.catch(err => console.log(err));
						});
					})
					.catch(err => {
						let errors_send  = [];
						for(let i = 0; i < err.errors.length; i++){
							errors_send.push({text:err.errors[i].message});
						}
						datoCteSchema.findAll()
						.then(datos => {
							res.render('plantilla/add', {
								route: "/plantilla/editar/" + p.id, editing:true, accion:"Actualizar",
								role : p.id_tipo, nombre, descripcion,
								campos : p.Campos, datos, errors_send,
								campo, info_llenado, opciones,
								es_cerrada_chk : (es_cerrada) ? "checked" : '',
								es_cte_chk : (es_cte) ? "checked" : '',
								es_archivo_chk : (es_archivo) ? "checked" : '',
							});
						})
						.catch(err => console.log(err));
					});
			})
			.catch(err => console.log(err));
	},
}