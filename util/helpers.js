module.exports = {
	setValues: (req, res, next) => {
		let {nombre, app, apm, exp, sexo, fecha_nacimiento, //nna
			peso, talla, escolaridad, //nna 2.0
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

		req.values = {
			nombre, app, apm, exp,	sexo, fecha_nacimiento,
			peso, talla, av_prev, act_seg, fecha_denuncia,
			calle, no_ext, no_int, colonia, municipio, cp, referencias,
			derechos, enfermedades
		}

		next();
	}
}