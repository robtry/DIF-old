const plantillaSchema =  require('../models/plantilla_model').plantilla;
const campoSchema =  require('../models/plantilla_model').campo;
const datoCteSchema = require('../models/plantilla_model').datoConst;
const opcionSchema =  require('../models/plantilla_model').opcion;
/*
const formatoSchema =  require('../models/formato_model').formato;
const respuestaSchema =  require('../models/respuesta_model').respuesta;
const resopSchema =  require('../models/resop_model').resop;
*/

const getTipo = require('./active_controller').getTipo;
const getAddPlantillaRoute = require('./active_controller').getAddPlantillaRoute;
const getErrorMessages = require('./active_controller').getErrorMessages;


module.exports = {

    getPlantillas: (role) => { 
		//only admins
		return (req, res) => {
			plantillaSchema.findAll({ where: { id_tipo : role} })
				.then(plantilla => {
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
				res.redirect("/plantilla/editar/" + p.id)
			})
			.catch(err => {
				const errors_send = getErrorMessages(err);
				res.render('plantilla/add', {
					tipo, role, route: "/plantilla/agregar",
					errors_send, nombre, descripcion,
					editing:false, accion:"Crear"
				});
			});
	},

	getEditPlantilla: (req, res) => {
		plantillaSchema.findByPk(req.params.id, { //include: [{ all: true }]
			include: [
				{model : campoSchema, include:[
					{all: true}
				]}
			]

		})
			.then(p => {
				//console.log(p.Campos[0].Dato_Consistente.dato)
				//console.log(p.Campos[2]);
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
		console.log(req.body);
		
		let {nombre, descripcion, role, //plantilla
			campo, info_llenado, type_field, // campo
			opciones, campo_pos, data_type} = req.body;
		
		/*console.log(data_type)//undefined
		console.log(type_field);//undefined
		console.log(opciones);//empty
		console.log(campo_pos);//empty*/

		let es_abierta=false, es_cerrada=false, es_multivalor=false, es_cte=false, es_archivo=false, es_sub=false;
		//get values:
		if(type_field){
			es_abierta = type_field == 'es_abierta';
			es_cerrada = type_field == 'es_cerrada';
			es_multivalor = type_field == 'es_multi';
			es_cte     = type_field == 'es_cte';
			es_archivo = type_field == 'es_archivo';
			es_sub     = type_field == 'es_sub'
		}
		
		let integer=false, txt=false, tinytxt=false;
		//get values
		if(data_type && es_abierta){
			integer = data_type == 'int';
			txt     = data_type == 'txt';
			tinytxt = data_type == 'str'
		}

		descripcion = (descripcion == '') ? null : descripcion;
		info_llenado = (info_llenado == '') ? null : info_llenado;
		opciones = (opciones == '') ? null : opciones;
		campo_pos = (campo_pos == '') ? null : campo_pos;

		plantillaSchema.findByPk(req.params.id, {include: [ campoSchema ]})
			.then(p => {
					p.nombre = nombre,
					p.descripcion = descripcion,
	
					p.save()			
					.then(pNew => {
						//simepre se va a crear
						let envio_op = (opciones) ? opciones.split("\n").length > 1 : false;
						campoSchema.create({
							id_plantilla : pNew.id,
							pregunta : campo,
							info_llenado,
							es_abierta,
							es_cerrada,
							es_multivalor,
							es_consistente: es_cte,
							es_archivo,
							es_subseccion: es_sub,
							id_dato_consistente : campo_pos,
							envio_opciones : envio_op,
							dato_int: integer,
							dato_string: tinytxt,
							dato_text: txt,
						})
							.then(newCamp =>{
								//si tenia opciones válidas
								if(envio_op){
									opciones = opciones.split("\n")
									//console.log(opciones)
									for(let i = 0; i < opciones.length; i++){
										if(opciones[i].length > 0){
											opcionSchema.create({
												id_campo : newCamp.id,
												opcion : opciones[i],
											})
											.then(() => {})
											.catch(err => {"--Error Adding Options--\n" + console.log(err)})
										}
									}
								}
								res.redirect("/plantilla/editar/" + pNew.id)
						})
						.catch(err => { //de craear un nuevo campo
							const errors_send = getErrorMessages(err);
							datoCteSchema.findAll()
								.then(datos => {
									res.render('plantilla/add', {
										route: "/plantilla/editar/" + p.id, editing:true, accion:"Actualizar",
										role : p.id_tipo, nombre, descripcion,
										campos : p.Campos, datos, errors_send,
										campo, info_llenado, opciones
									});
								})
								.catch(err => console.log(err));
						});
					})
					.catch(err => { //de update a la plantilla
						const errors_send = getErrorMessages(err);
						datoCteSchema.findAll()
						.then(datos => {
							res.render('plantilla/add', {
								route: "/plantilla/editar/" + p.id, editing:true, accion:"Actualizar",
								role : p.id_tipo, nombre, descripcion,
								campos : p.Campos, datos, errors_send,
								campo, info_llenado, opciones
							});
						})
						.catch(err => console.log(err));
					});
			})
			.catch(err => console.log(err));
	},

	deletePlantilla: (req, res) => {
		plantillaSchema.destroy({where:{id: parseInt(req.params.id)}})
			.then(() => res.send('Ok'))
			.catch(err => console.log("--Error in Deleting Template\n" + err));
	},

	deleteCampo: (req, res) => {
		campoSchema.findByPk(parseInt(req.params.id), { include: [{ all: true }]})
			.then(c =>{
				//console.log(c.Opcions)
				if(c.Opcions){
					for(let i = 0; i < c.Opcions.length; i++){
						opcionSchema.destroy({where: {id : c.Opcions[i].id} })
							.then()
							.catch(err => console.log("--Error in Deleting Nested Option\n" + err));
					}
				}
				c.destroy()
					.then(() => res.send('Ok'))
			})
			.catch(err => console.log("--Error in Deleting Field\n" + err));
	},
}