const nnaSchema = require('../models/nna_model').nna;
const Sequelize = require('sequelize');

module.exports = {
	buscarNNA: async (req, res) => {
		const nna = req.body.nna;

		const result = await nnaSchema.findAll({
			where: {
				nombre: nna
			}
		});
		if(result.length > 0) {
			console.log(`Encontró resultados para ${nna}`)
			res.render('nna/nnas', {result});
		} else {
			console.log(`No encontró resultados para ${nna}`)
			res.render('nna/nnas');
		}
	}
}