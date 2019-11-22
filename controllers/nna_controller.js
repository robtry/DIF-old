const nnaSchema = require('../models/nna_model').nna;
const escolariadSchema = require('../models/auxiliar_model').escolaridad
const denunciaSchema = require('../models/denuncia_model').denuncia;

module.exports = {


	getNNA: (req, res) => {
		//console.log(req.params.exp)
		nnaSchema.findByPk(req.params.exp, {include: [ denunciaSchema, ]})
			.then(nna => {
				//console.log(nna)
				//console.log(nna.Denuncia[0].averiguacion_previa)
				//console.log(nna.Denuncia)
				escolariadSchema.findAll()
				.then(esc => {
					res.render('nna/show',{
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

	getNNAs : (req, res) => {
		nnaSchema.findAll({order: [
            ['created_at', 'DESC'],
        ],})
			.then(nna => {
				res.render('nna/nnas', {nna})
			})
			.catch(err => console.log(err));
	},

	getAgregarNNA : (req, res) => {
		escolariadSchema.findAll()
		.then(esc => {
			res.render('nna/add', {esc, route:"/nna/agregar"})
		})
		.catch(err => console.log(err));
	},

	//post
	agregarNNA: (req, res) => {
		//console.log(req.body)
		let {nombre, app, apm, exp, sexo, fecha_nacimiento, peso, talla, escolaridad, //
			av_prev, act_seg, fecha_denuncia
		} = req.body;

		sexo = (sexo == '') ? null : sexo;
		fecha_nacimiento = (fecha_nacimiento == '') ? null : fecha_nacimiento;
		peso = (peso == '') ? null : peso;
		talla = (talla == '') ? null : talla;
		escolaridad = (escolaridad == '') ? null : escolaridad;
		//denuncia
		av_prev = (av_prev == '') ? null : av_prev;
		act_seg = (act_seg == '') ? null : act_seg;
		fecha_denuncia = (fecha_denuncia == '') ? null : fecha_denuncia;

		nnaSchema.create({
			exp,
			nombre,
			app,
			apm,
			sexo,
			fecha_nacimiento,
			peso,
			talla,
			id_escolaridad : escolaridad
		})
			.then(nnaCreated => {
				denunciaSchema.create({
					av_prev,
					act_seg,
					fecha_denuncia,
					id_nna : nnaCreated.exp
				}).then(den => {}).catch(err => console.log(err))
				res.redirect('/nnas')
			}) //created succesfully
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
							peso, talla, esc, route:"/nna/agregar",
							av_prev, act_seg, fecha_denuncia
						});
					})
					.catch(err => {console.log(err)});
			});
	},

	getEditNNA: (req, res) => {
		//console.log(req.params.exp)
		nnaSchema.findByPk(req.params.exp, {include: [ denunciaSchema ]})
			.then(nna => {
				//console.log(nna)
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
}