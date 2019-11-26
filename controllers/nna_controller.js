const nnaSchema = require('../models/nna_model').nna;
const escolariadSchema = require('../models/auxiliar_model').escolaridad
const derechoSchema = require('../models/auxiliar_model').derecho;
const enfermedadSchema = require('../models/auxiliar_model').enfermedad;
const denunciaSchema = require('../models/denuncia_model').denuncia;
const domicilioSchema = require('../models/nna_model').domicilio;
const nnaDerechoSchema = require('../models/nna_model').nnaDerecho;
const nnaEnfermedad = require('../models/nna_model').nnaEnfermedad;

const getErrorMessages = require('./active_controller').getErrorMessages;

const getRenderData = async (req, res) => {
	try {
		const esc = await escolariadSchema.findAll();
		const der = await derechoSchema.findAll();
		const enf = await enfermedadSchema.findAll();
		res.render('nna/add', {esc, der, enf, ...req.values})
	} catch(err) {
		console.log("--Error rendering data: \n" + err);
	}
}

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
	getAgregarNNA : async (req, res) => {
		req.values = {route:"/nna/agregar", action_btn:"Agregar"};
		getRenderData(req, res);
	},

	//post
	agregarNNA: async (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, sexo, fecha_nacimiento, //nna
			peso, talla, escolaridad, //nna 2.0
			calle, no_ext, no_int, colonia, municipio, cp, referencias, //domicilio
			av_prev, act_seg, fecha_denuncia, //denuncia
			derechos, enfermedades
		} = req.values;

		let nnaCreated;
		try {
			nnaCreated = await nnaSchema.create({
				exp, nombre, app,
				apm, sexo, fecha_nacimiento,
				peso, talla, id_escolaridad : escolaridad
			})
			
		} catch (err){
			const errors_send = getErrorMessages(err);
			req.values = {  route:"/nna/agregar", action_btn:"Agregar",
				errors_send, ...req.values
			};
			return getRenderData(req, res)
		}

		try {
			await domicilioSchema.create({
				id_nna : nnaCreated.exp, calle,	no_ext,
				no_int, municipio, colonia,
				cp,	entre_calles: referencias
			});
		} catch(err) {
			const errors_send = getErrorMessages(err);
			req.values = {  route: `/nna/editar/${nnaCreated.exp}`, action_btn:"Actualizar",
				errors_send, ...req.values
			};
			return getRenderData(req, res)
		} 

		try {
			await denunciaSchema.create({
				averiguacion_previa:av_prev,
				seguimiento_acta:act_seg,
				fecha_denuncia: fecha_denuncia, 
				id_nna : nnaCreated.exp
			})
		} catch (err) {
			const errors_send = getErrorMessages(err);
			req.values = { route: `/nna/editar/${nnaCreated.exp}`, action_btn:"Actualizar",
				errors_send, ...req.values
			};
			return getRenderData(req, res)
		}
		
		if(derechos){
			for(let i = 0; i < derechos.length; i++) {
				try {
					await nnaDerechoSchema.create({
						id_nna: nnaCreated.exp, id_derecho : parseInt(derechos[i])
					})					
				} catch (err) {
					const errors_send = getErrorMessages(err);
					req.values = {  route: `/nna/editar/${nnaCreated.exp}`, action_btn:"Actualizar",
						errors_send, ...req.values
					};
					return getRenderData(req, res)
				}
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
					try {
						await nnaEnfermedad.create({
							id_nna : nnaCreated.exp,
							id_enfermedad : enfermedades[i],
							comentario : comment
						})
					} catch (err) {
						const errors_send = getErrorMessages(err);
						req.values = {  route:"/nna/editar/" + nnaCreated.exp, action_btn:"Actualizar",
							errors_send, ...req.values
						};
						return getRenderData(req, res)
					}
				}
			}
		}
		res.redirect('/nna/editar/' + nnaCreated.exp)
	},

	getEditNNA: async (req, res) => {
		//console.log(req.params.exp)
		const nna = await nnaSchema.findByPk(req.params.exp, {include: [ enfermedadSchema, derechoSchema, domicilioSchema, denunciaSchema]});

		console.log(nna)
		//console.log(nna.Denuncia)
		console.log(nna.Enfermedads)
		console.log(nna.Derechos)
		console.log(nna.Domicilios)
		return
		req.values = {
			route:"/nna/editar/" + nna.exp, action_btn:"Actualizar",
			nombre:nna.nombre, app:nna.app, apm:nna.apm,
			exp:nna.exp, sexo:nna.sexo, fecha_nacimiento:nna.fecha_nacimiento,
			peso:nna.peso, talla:nna.talla, escolaridad:nna.id_escolaridad,
			//Denuncia
			av_prev : nna.Denuncia.averiguacion_previa,
			act_seg : nna.Denuncia.seguimiento_acta,
			fecha_denuncia : nna.Denuncia.fecha_denuncia,
			//Enfermedades
			//Derechos
			//Domicilios
			//calle : nna.calle, no_ext : nna.no_ext, no_int, colonia, municipio, cp, referencias
		}
		getRenderData(req, res);

		/*
		Enfermedads: [],
		Derechos: [],
		Domicilios: [],
		Denuncia: []
		*/
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