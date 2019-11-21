const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;
const escolaridadSchema = require('./auxiliar_model').escolaridad;
const denunciaSchema = require('./denuncia_model').denuncia;
const enfermedadSchema = require('./auxiliar_model').enfermedad;

const nnaSchema = sequelize_db.define('NNA', {
        exp: {type: Sequelize.STRING, allowNull: false, primaryKey: true, unique: true, validate:{
            notEmpty: { msg:"El campo Expediente no puede estar vacio"},
        }},
        nombre: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [2,20], msg: "El nombre esta fuera de los rangos permitidos [2,20]" }, 
            notEmpty: { msg:"El campo nombre no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el Nombre"} 
        }},
        app: {type: Sequelize.STRING, validate:{
            len: { args: [2,20], msg: "El Apellido Paterno esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo Apellido Paterno no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el Apellido Paterno"}
        }},
        apm: {type: Sequelize.STRING, validate:{
            len: { args: [2,20], msg: "El Apellido Materno esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo Apellido Materno no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el Apellido Materno"}
        }},
        fecha_nacimiento: {type: Sequelize.DATEONLY, validate:{
            isDate: { msg:"Ingrese una fecha válida"},
            isBefore: { args: [new Date().toISOString().slice(0,10)], msg: "Ingrese una fecha válida"}
        }},
        sexo: {type: Sequelize.CHAR, validate:{
            isIn: {args: ['m','f'], msg: "Ingrese un sexo válido"}
        }},
        ocupacion: {type: Sequelize.STRING},
        peso:  {type: Sequelize.FLOAT, validate:{
            isFloat: { msg: "Ingrese un peso válido"},
            min: { args: [1], msg: "Peso inválido"}
        }},
        talla: {type: Sequelize.FLOAT, validate:{
            isFloat: { msg: "Ingrese una talla válida"},
            min: { args: [1], msg: "Talla inválida"}
        }},
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