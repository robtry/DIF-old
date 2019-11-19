const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;
const escolaridadSchema = require('./auxiliar_model').escolaridad;
const denunciaSchema = require('./denuncia_model').denuncia;
const enfermedadSchema = require('./auxiliar_model').enfermedad;

const nnaSchema = sequelize_db.define('NNA', {
        exp: {type: Sequelize.STRING, allowNull: false, primaryKey: true, unique: true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        app: {type: Sequelize.STRING},
        apm: {type: Sequelize.STRING},
        fecha_nacimiento: {type: Sequelize.DATEONLY},
        sexo: {type: Sequelize.CHAR},
        ocupacion: {type: Sequelize.STRING},
        peso:  {type: Sequelize.FLOAT},
        talla: {type: Sequelize.FLOAT},
        id_escolaridad: {
            type: Sequelize.INTEGER,
			references: {
				model : escolaridadSchema,
				key : 'id'
			}
        },
        id_denuncia: {
            type: Sequelize.INTEGER,
			references: {
				model : denunciaSchema,
				key : 'id'
			}
        },
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
    }
);

const nnaDerechoSchema = sequelize_db.define('NNA_Derecho',{
        id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
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

const nnaEnfermedadSchema = sequelize_db.define('NNA_Enfermedad',{
        id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        id_nna: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model : nnaSchema,
                key : 'exp'
            }
        },
        id_enfermedad: {
            type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : enfermedadSchema,
				key : 'id'
			}
        },
        comentario: {type: Sequelize.STRING}
    },{
        freezeTableName: true,
        underscored: true,
        timestamps: true,
    }
);

module.exports = {
    nna : nnaSchema,
    nnaDerecho : nnaDerechoSchema,
    nnaEnfermedad : nnaEnfermedadSchema
}