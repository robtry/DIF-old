const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;

const userSchema = sequelize_db.define('Usuario', {
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		nickname:  {type: Sequelize.STRING, allowNull: false},
		nombre:    {type: Sequelize.STRING, allowNull: false},
		app:       {type: Sequelize.STRING, allowNull: false},
		apm:       {type: Sequelize.STRING, allowNull: false},
		no_cedula: {type: Sequelize.STRING, allowNull: false},
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
    id_formato: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_psicologo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ultimo_acceso: {
        type: Sequelize.DATEONLY
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});


module.exports = { 
	User : userSchema,
	UserFormat : userFormatSchema
};