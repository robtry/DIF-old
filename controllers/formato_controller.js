const formatoSchema =  require('../models/plantilla_model').formato;
const plantillaSchema = require('../models/plantilla_model').plantilla;
const opSchema = require('../models/plantilla_model').opcion;
const resop = require('../models/plantilla_model').resop;
const userFormatSchema = require('../models/usuario_model').userFormatSchema

const res_int = require('../models/plantilla_model').respuesta_int;
const res_str = require('../models/plantilla_model').respuesta_str;
const res_text = require('../models/plantilla_model').respuesta_text;
const res_date = require('../models/plantilla_model').respuesta_date;

const campoSchema =  require('../models/plantilla_model').campo;
const datoCteSchema = require('../models/plantilla_model').datoConst;
const getTipo = require('./active_controller').getTipo;
const getAddFormatRoute = require('./active_controller').getAddFormatRoute;

module.exports = {
	getFormato: async (req, res) => {

		const formato = await formatoSchema.findByPk(parseInt(req.params.id), {
			include: [
				{
					model: plantillaSchema
				}
			]
		});
		let campos;
			try {
				campos = await campoSchema.findAll({ where : {id_plantilla : formato.Plantilla.id},
					include: [
							{model: plantillaSchema},
							{model : opSchema},
							{model : datoCteSchema},
							{model : res_int,  where:  {id_formato : formato.id}, required: false},
							{model : res_date, where: {id_formato : formato.id} , required: false},
							{model : res_str,  where:  {id_formato : formato.id}, required: false},
							{model : res_text, where: {id_formato : formato.id} , required: false},
							
						]

				})
				
				res.render('formato/show', {
					route: "/formato/agregar", campos,
					nombre_plantilla : campos[0].Plantilla.nombre, id_plantilla : campos[0].Plantilla.id
				});
			} catch(err){
				console.log(err)
			}
	},
    getFormatos: (role) => { 
		//only admins
		return (req, res) => {
			formatoSchema.findAll({
				include: [{
					model: plantillaSchema,
					where: { id_tipo: role }
				}]
			})
				.then(format => {
					//console.log(format)
					const tipo = getTipo(role);
					const add_route =  getAddFormatRoute(role);
					res.render('formato/formatos', {format, tipo, role, add_route})
				})
				.catch(err => console.log(err));
		}
    },
    
    
	getAddFormato: async (req, res) => {
			//console.log(req.params) id y exp
			const [f,created] = await formatoSchema.findOrCreate({where : {id_plantilla : req.params.id, id_nna : req.params.exp}})

			//console.log(f)
			let campos;
			try {
				campos = await campoSchema.findAll({ where : {id_plantilla : parseInt(req.params.id)},
					include: [
							{model: plantillaSchema},
							{model : opSchema},
							{model : datoCteSchema},
							{model : res_int,  where:  {id_formato : f.id}, required: false},
							{model : res_date, where: {id_formato : f.id} , required: false},
							{model : res_str,  where:  {id_formato : f.id}, required: false},
							{model : res_text, where: {id_formato : f.id} , required: false},
							
						]

				})
				//console.log(campos)
				//console.log(campos[0].Opcions)
				//console.log(campos[0].Plantilla)
				/*Opcions: [],
				Dato_Consistente: null,
				Respuesta_Ints: [],
				Respuesta_Dates: [],
				Respuesta_Strs: [],
				Respuesta_Texts: []
				*/
				res.render('formato/add', {
					exp: req.params.exp, route: "/formato/agregar", campos,
					nombre_plantilla : campos[0].Plantilla.nombre, id_plantilla : campos[0].Plantilla.id
				});
			} catch (err) {
				console.log("--Error in get add formato--", err)
			}

    },
	
	//post
    addFormato:  async (req, res) => {
		//console.log(req.params)
		//console.log(req.body)
		//return
		const f = await formatoSchema.findOne({where : {id_plantilla : req.params.id, id_nna : req.params.exp}})
		if(req.body){

			Object.keys(req.body).forEach(async function(key){
				console.log(key)
				let campo = await campoSchema.findByPk(key);
	
				if(campo.es_abierta){
					if(campo.dato_int){
						try {
							await res_int.create({
								id_formato : f.id,
								id_campo : campo.id,
								respuesta : req.body[key]
							})
						} catch (error) {
							
						}
					}
					else if(campo.dato_string || campo.dato_hora){
						try {
							await res_str.create({
								id_formato : f.id,
								id_campo : campo.id,
								respuesta : req.body[key]
							})
						} catch (error) {
							
						}
					}
					else if(campo.dato_text){
						try {
							await res_text.create({
								id_formato : f.id,
								id_campo : campo.id,
								respuesta : req.body[key]
							})
						} catch (error) {
							
						}
					}
					else if(campo.dato_fecha){
						try {
							await res_date.create({
								id_formato : f.id,
								id_campo : campo.id,
								respuesta : req.body[key]
							})
						} catch (error) {
							
						}
					}
				}else  if(campo.es_cerrada){
					try {
						const res_cr = await res_int.create({
							id_formato : f.id,
							id_campo : campo.id,
							respuesta : 0
						})
						resop.create({
							id_opcion : req.body[key],
							id_respuesta : res_cr.id
						})

					} catch (error) {
						
					}
				}else if(campo.es_archivo){
				}else if(campo.es_muiltivalor){
					for(let i = 0; i < req.body[key].length; i++){
						try {
							const res_cr = await res_int.create({
								id_formato : f.id,
								id_campo : campo.id,
								respuesta : 0
							})
							resop.create({
								id_opcion : req.body[key][i],
								id_respuesta : res_cr.id
							})
	
						} catch (error) {
							
						}
					}
				}
			})
		}

		//userFormatSchema.create({id_formato: f.id, id_usuario : 26})
		res.redirect(`/formato/${f.id}`);
    },
    
    getEditFormato: (req, res) => {
		plantillaSchema.findByPk(req.params.id, {include: [ campoSchema ]})
			.then(p => {
				//console.log(p)
				datoCteSchema.findAll()
					.then(datos => {
						res.render('formato/add', {
							route: "/formato/editar/" + p.id, editing:true, accion:"Actualizar",
							role : p.id_tipo, nombre : p.nombre, descripcion : p.descripcion,
							campos : p.Campos, datos
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err))
    },
    
    editFormato: (req, res) => {
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

		formatoSchema.findByPk(req.params.id)
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

