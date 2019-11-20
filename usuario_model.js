const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;
const formatSchema = require('./plantilla_model').formato;

const userSchema = sequelize_db.define('Usuario', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		nickname:  {type: Sequelize.STRING, allowNull: false, unique : true, validate: {
			isAlphanumeric: { msg: "Ingrese un nickname valido"}
		}},
		pass:      {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese una contraseña"}
		}},
		nombre:    {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese una contraseña"},
			isAlpha: { msg: "Solo se permiten letras en el Nombre"}
		}},
		app:       {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese el apellido paterno"}
		}},
		apm:       {type: Sequelize.STRING, allowNull: false, validate: {
			notEmpty: { msg: "Ingrese apellido Materno"}
		}},
		no_cedula: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {
			notEmpty: { msg: "Ingrese cédula"}
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