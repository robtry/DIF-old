const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;

const denunciaSchema = sequelize_db.define('Denuncia',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		averiguacion_previa: {type: Sequelize.STRING},
		seguimineto_acta:    {type: Sequelize.STRING},
		fecha_denuncia:      {type: Sequelize.DATEONLY, allowNull: false, validate: {
			isDate: { msg: "Ingrese fecha valida"}
		}},
	},
	{
		freezeTableName: true,
		//underscored: true,
		timestamps: false,
	}
);

const derechoVulSchema = sequelize_db.define('Derecho_Vulnerado', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_denuncia: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : denunciaSchema,
				key : 'id'
			}
		},
		id_derecho: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : derechoSchema,
				key : 'id'
			}
		}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

module.exports = {
	denuncia : denunciaSchema,
	derechoVul : derechoVulSchema
}