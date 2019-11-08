const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;

const nnaSchema = sequelize_db.define('NNA', {
        exp: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        nombre: {type: Sequelize.STRING, allowNull: false},
        app: {type: Sequelize.STRING},
        apm: {type: Sequelize.STRING},
        escolaridad: {type: Sequelize.STRING},
        ocupacion: {type: Sequelize.STRING},
        sexo: {type: Sequelize.CHAR},
        fecha_nacimiento: {type: Sequelize.DATEONLY}
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    }
);

const nnaDerechoSchema = sequelize_db.define('NNA_Derecho',{
        id: {
            type: Sequelize.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_nna : {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model : nnaSchema,
                key : 'exp'
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
    nna : nnaSchema,
    nnaDerecho : nnaDerechoSchema
}