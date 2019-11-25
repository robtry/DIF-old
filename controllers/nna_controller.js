const nnaSchema = require('../models/nna_model').nna;
const escolariadSchema = require('../models/auxiliar_model').escolaridad
const derechoSchema = require('../models/auxiliar_model').derecho;
const enfermedadSchema = require('../models/auxiliar_model').enfermedad;
const denunciaSchema = require('../models/denuncia_model').denuncia;
const domicilioSchema = require('../models/nna_model').domicilio;
const nnaDerechoSchema = require('../models/nna_model').nnaDerecho;
const nnaEnfermedad = require('../models/nna_model').nnaEnfermedad;

const getErrorMessages = require('./active_controller').getErrorMessages;

module.exports = {


	getNNA: (req, res) => {
		// nnaSchema.findByPk(req.params.exp, {include: [ denunciaSchema, ]})
		// 	.then(nna => {
		// 		escolariadSchema.findAll()
		// 		.then(esc => {
		// 			res.render('nna/show',{
		// 				nombre: nna.nombre, app : nna.app, apm : nna.apm,
		// 				exp : nna.exp, sexo : nna.sexo, fecha_nacimiento : nna.fecha_nacimiento,
		// 				peso : nna.peso, talla : nna.talla, esc, route:"/nna/editar/"+nna.exp,
		// 				av_prev : (nna.Denuncia.length > 0) ? nna.Denuncia[0].averiguacion_previa : '',
		// 				act_seg : (nna.Denuncia.length > 0) ? nna.Denuncia[0].seguimiento_acta : '',
		// 				fecha_denuncia : (nna.Denuncia.length > 0) ? nna.Denuncia[0].fecha_denuncia : ''
		// 			});
		// 		})
		// 	})
		// 	.catch(err => console.log(err));
	},

	getNNAs : (req, res) => {
		nnaSchema.findAll({order: [
            ['created_at', 'DESC'],
        ]})
			.then(nna => {
				res.render('nna/nnas', {nna})
			})
			.catch(err => console.log("--Error getting NNAs--\n" + err));
	},

	getAgregarNNA : (req, res) => {
		escolariadSchema.findAll()
			.then(esc => {
				derechoSchema.findAll()
					.then(der => {
						enfermedadSchema.findAll()
						.then(enf => {
							res.render('nna/add', {esc, der, enf, route:"/nna/agregar"})
						})
						.catch(err => console.log("--Error getting enfermedad--\n" + err));
					})
					.catch(err => console.log("--Error getting derechos--\n" + err));
			})
			.catch(err => console.log("--Error getting escolaridad--\n" + err));
	},

	//post
	agregarNNA: (req, res) => {
		//console.log(req.body)

		let {nombre, app, apm, exp, sexo, fecha_nacimiento, //nna
			peso, talla, escolaridad, //
			calle, no_ext, no_int, colonia, municipio, cp, referencias, //domicilio
			av_prev, act_seg, fecha_denuncia, //denuncia
			derechos, enfermedades
		} = req.body;

		//nna
		sexo = (sexo == '') ? null : sexo;
		fecha_nacimiento = (fecha_nacimiento == '') ? null : fecha_nacimiento;
		//
		peso = (peso == '') ? null : peso;
		talla = (talla == '') ? null : talla;
		escolaridad = (escolaridad == '') ? null : escolaridad;
		//domicilo
		calle = (calle == '') ? null : calle;
		no_ext = (no_ext == '') ? null : no_ext;
		no_int = (no_int == '') ? null : no_int;
		colonia = (colonia == '') ? null : colonia;
		municipio = (municipio == '') ? null : municipio;
		cp = (cp == '') ? null : cp;
		referencias = (referencias == '') ? null : referencias;
		//denuncia
		av_prev = (av_prev == '') ? null : av_prev;
		act_seg = (act_seg == '') ? null : act_seg;
		fecha_denuncia = (fecha_denuncia == '') ? null : fecha_denuncia;


		nnaSchema.create({
			exp, nombre, app,
			apm, sexo, fecha_nacimiento,
			peso, talla, id_escolaridad : escolaridad
		})
			.then(nnaCreated => {

				domicilioSchema.create({
					id_nna : nnaCreated.exp, calle,	no_ext,
					no_int, municipio, colonia,
					cp,	entre_calles: referencias
				})
					.then()
					.catch(err => console.log("--Error Creting Domicilio--\n" + err))

				denunciaSchema.create({
					av_prev, act_seg, fecha_denuncia, id_nna : nnaCreated.exp
				})
					.then()
					.catch(err => console.log("--Error Creting Denuncia--\n" + err))
				
				if(derechos){
					for(let i = 0; i < derechos.length; i++){
						nnaDerechoSchema.create({
							id_nna: nnaCreated.exp, id_derecho : parseInt(derechos[i])
						})
							.then()
							.catch(err => console.log("--Error Creting Derecho--\n" + err))
					}
				}
				if(enfermedades){
					for(let i = 0; i < enfermedades.length - 1; i++){
						if((parseInt(enfermedades[i]))){
							let comment = '';
							if(!(parseInt(enfermedades[i+1]))){
								comment = enfermedad[i+1];
							}else{
								comment = null;
							}
							nnaEnfermedad.create({
								id_nna : nnaCreated.exp,
								id_enfermedad : enfermedades[i],
								comentario : comment
							})
								.then()
								.catch(err => console.log("--Error Creting Enfermedad--\n" + err))
						}
					}
				}
				res.redirect('/nna/' + nnaCreated.exp)
			}) //created succesfully
			.catch(err => {
				escolariadSchema.findAll()
					.then(esc => {
						derechoSchema.findAll()
							.then(der => {
								enfermedadSchema.findAll()
								.then(enf => {
									res.render('nna/add', {esc, der, enf, route:"/nna/agregar",
									errors_send, nombre, app, apm, exp,	sexo, fecha_nacimiento,
									peso, talla, av_prev, act_seg, fecha_denuncia,
									calle, no_ext, no_int, colonia, municipio, cp, referencias
									})
								})
								.catch(err => console.log("--Error getting enfermedad--\n" + err));
							})
							.catch(err => console.log("--Error getting derechos--\n" + err));
					})
					.catch(err => console.log("--Error getting escolaridad--\n" + err));
			});
	},

	getEditNNA: (req, res) => {
		//console.log(req.params.exp)
		nnaSchema.findByPk(req.params.exp, {include: [ enfermedadSchema, derechoSchema, escolariadSchema, domicilioSchema, denunciaSchema]})
		.then(nna => {
				//console.log(nna)
				//return
				//console.log(nna.Denuncia[0].averiguacion_previa)
				//console.log(nna.Denuncia)
				escolariadSchema.findAll()
				.then(esc => {
					res.render('nna/add',{
						nombre: nna.nombre, app : nna.app, apm : nna.apm,
						exp : nna.exp, sexo : nna.sexo, fecha_nacimiento : nna.fecha_nacimiento,
						peso : nna.peso, talla : nna.talla, esc, route:"/nna/editar/"+nna.exp,
						av_prev : (nna.Denuncia.length > 0) ? nna.Denuncia[0].averiguacion_previa : '',
						act_seg : (nna.Denuncia.length > 0) ? nna.Denuncia[0].seguimiento_acta : '',
						fecha_denuncia : (nna.Denuncia.length > 0) ? nna.Denuncia[0].fecha_denuncia : ''
					});
				})
			})
			.catch(err => console.log(err));
	},

	//post
	editNNA: (req, res) =>{
		let {nombre, app, apm, exp, sexo, fecha_nacimiento, peso, talla, escolaridad, //
			av_prev, act_seg, fecha_denuncia
		} = req.body;

		//nombre = ( nombre == '') ? null : nombre;
		//exp = (exp == '') ? null : exp;
		app = (app == '') ? null : app;
		apm = (apm == '' ) ? null : apm;
		sexo = (sexo == '') ? null : sexo;
		fecha_nacimiento = (fecha_nacimiento == '') ? null : fecha_nacimiento;
		peso = (peso == '') ? null : peso;
		talla = (talla == '') ? null : talla;
		escolaridad = (escolaridad == '') ? null : escolaridad;
		//denuncia
		av_prev = (av_prev == '') ? null : av_prev;
		act_seg = (act_seg == '') ? null : act_seg;
		//console.log("denunc: " + fecha_denuncia)
		fecha_denuncia = (fecha_denuncia == '') ? null : fecha_denuncia;
		//console.log("denunc: " + fecha_denuncia)

		nnaSchema.findByPk(req.params.exp, {include: [ denunciaSchema ]})
			.then(nna => {
				nna.nombre = nombre;
				nna.app = app;
				nna.apm = apm;
				nna.exp = exp;
				nna.sexo = sexo;
				nna.fecha_nacimiento = fecha_nacimiento;
				nna.peso = peso
				nna.talla = talla
				nna.id_escolaridad = escolaridad
				nna.save()
					.then(nnaCreated =>{
						
						if(nna.Denuncia.length > 0){
							//ya habia
							nna.Denuncia[0].averiguacion_previa = av_prev;
							nna.Denuncia[0].seguimiento_acta = act_seg;
							nna.Denuncia[0].fecha_denuncia = fecha_denuncia;
							nna.Denuncia[0].save()
								.then(den => res.redirect('/nnas'))
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
												nombre,	app, apm, exp,
												sexo, fecha_nacimiento,
												peso, talla, esc, route:"/nna/editar/"+nna.exp,
												av_prev, act_seg, fecha_denuncia,
											});
										})
										.catch(err => {console.log(err)});
								});
						}else{
							//no habia
							denunciaSchema.create({
								av_prev,
								act_seg,
								fecha_denuncia,
								id_nna : nnaCreated.exp
							})
								.then(den => res.redirect('/nnas'))
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
												nombre,	app, apm, exp,
												sexo, fecha_nacimiento,
												peso, talla, esc, route:"/nna/editar/"+nna.exp,
												av_prev, act_seg, fecha_denuncia,
											});
										})
										.catch(err => {console.log(err)});
								});
						}
					})
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
									nombre,	app, apm, exp,
									sexo, fecha_nacimiento,
									peso, talla, esc, route:"/nna/editar/"+nna.exp,
									av_prev, act_seg, fecha_denuncia,
								});
							})
							.catch(err => {console.log(err)});
					});
			})
			.catch(err => console.log(err)); //modificacion en los params
	},

	deleteNNA: (req, res) => {
		nnaSchema.findByPk(req.params.exp, { include: [{ all: true }]})
			.then((nna) => {
				//console.log(nna);
				for(let i = 0; i < nna.Denuncia.length; i++){
					denunciaSchema.destroy({where : {id : nna.Denuncia[i].id}})
						.then()
						.catch(err => console.log("--Error in Deleting Nested Denuncia\n" + err));
				}
				nna.destroy()
					.then(() => res.send("ok"))
					.catch((err) => console.log("--Error Deleting NNA\n" + err))
			})
			.catch((err) => console.log("--Error Finding NNA\n" + err))
	}
}