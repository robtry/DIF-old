const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;
const formatSchema = require('./plantilla_model').formato;

const userSchema = sequelize_db.define('Usuario', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		nickname:  {type: Sequelize.STRING, allowNull: false, unique : true, validate: {
			isAlphanumeric: { msg: "Ingrese un Nickname válido (sin símbolos ni espacios)"},
			len: { args: [5,10], msg: "El nickname esta fuera de los rangos permitidos [5,10]" }
		}},
		pass:      {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese una contraseña"}
		}},
		nombre:    {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese un Nombre" },
			is:  { args : /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ ?)+/, msg: "Ingrese un Nombre válido"},
			len: { args: [2,20], msg: "El nombre esta fuera de los rangos permitidos [2,20]" }
		}},
		app:       {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese el Apellido Paterno"},
			is:  { args : /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ ?)+/, msg: "Ingrese un Apellido Paterno válido"},
			len: { args: [2,20], msg: "El Apellido Paterno esta fuera de los rangos permitidos [2,20]" },
		}},
		apm:       {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese Apellido Materno"},
			is:  { args : /^([A-ZÁÉÍÓÚ][a-záéíóú]+ ?)+/, msg: "Ingrese un Apellido Materno válido"},
			len: { args: [2,20], msg: "El Apellido Materno esta fuera de los rangos permitidos [2,20]" },
		}},
		no_cedula: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {
			notEmpty: { msg: "Ingrese una cédula"}
		}},
		id_tipo: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : tipoSchema,
				key : 'id'
			}
		}
	},{
		freezeTableName: true, 
		underscored: true, //not use camel case
		timestamps: false, //dont have field createdAt & updatedAt
	}
);

const userFormatSchema = sequelize_db.define('Usuario_Formato', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_formato: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : formatSchema,
				key : 'id'
			}
		},
		id_usuarios: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : userSchema,
				key : 'id'
			}
		}
	}, {
		freezeTableName: true,
		underscored: true,
		timestamps: true,
	}
);


module.exports = { 
	User : userSchema,
	UserFormat : userFormatSchema
};