const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const nnaSchema = require('./nna_model').nna;

const denunciaSchema = sequelize_db.define('Denuncia',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		averiguacion_previa: {type: Sequelize.STRING, validate: {
			notEmpty: { msg:"Averiguación Previa no puede estar vacío"},
		}},
		seguimiento_acta:    {type: Sequelize.STRING, validate: {
			notEmpty: { msg:"Averiguación Previa no puede estar vacío"},
		}},
		fecha_denuncia:      {type: Sequelize.DATEONLY, validate: {
			isDate: { msg: "Ingrese fecha válida en Denuncia"},
			isBefore: { args: [new Date().toISOString().slice(0,10)], msg: "Ingrese una fecha válida"}
		}},
		id_nna: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model : nnaSchema,
                key : 'exp'
            }
        },
	},
	{
		freezeTableName: true,
		//underscored: true,
		timestamps: false,
		validate : {
			allOrNone(){
				/*console.log(this.fecha_denuncia);
				console.log(this.averiguacion_previa);
				console.log(this.seguimiento_acta)*/
				if(
					!( (this.fecha_denuncia !== null) && (this.averiguacion_previa !== null)  && (this.seguimiento_acta !== null) ) 
				){
					throw new Error('Deben completarse todos los campos de la Denuncia')
				}
			}
		}
	}
);

denunciaSchema.belongsTo(nnaSchema, {foreignKey: 'id_nna', targetKey: 'exp'});
nnaSchema.hasMany(denunciaSchema,  {foreignKey: 'id_nna', sourceKey: 'exp'});

module.exports = {
	denuncia : denunciaSchema,
}