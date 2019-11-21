const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;
const escolaridadSchema = require('./auxiliar_model').escolaridad;
const denunciaSchema = require('./denuncia_model').denuncia;
const enfermedadSchema = require('./auxiliar_model').enfermedad;

const nnaSchema = sequelize_db.define('NNA', {
        exp: {type: Sequelize.STRING, allowNull: false, primaryKey: true, unique: true},
        nombre: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [[2,20]], msg: "El nombre esta fuera de los rangos permitidos [2,20]" }, 
            notEmpty: { msg:"El campo nombre no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el nombre"} 
        }},
        app: {type: Sequelize.STRING, validate:{
            len: { args: [[2,20]], msg: "El apellidoP esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo apellidoP no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el apellidoP"}
        }},
        apm: {type: Sequelize.STRING,  validate:{
            len: { args: [[2,20]], msg: "El apellidoM esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo apellidoM no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el apellidoM"}
        }},
        fecha_nacimiento: {type: Sequelize.DATEONLY, validate:{
            isDate: { msg:"Ingrese una fecha valida"},
            isBefore: { args: [[Date.today]], msg: "Ingrese una fecha valida"}
        }},
        sexo: {type: Sequelize.CHAR, validate:{
            isIn: {args: [['m','f']], msg: "Ingrese un sexo valido"}
        }},
        ocupacion: {type: Sequelize.STRING},
        peso:  {type: Sequelize.FLOAT, validate:{
            isFloat: { msg: "Ingrese un peso valido"}
        }},
        talla: {type: Sequelize.FLOAT, validate:{
            isFloat: { msg: "Ingrese una talla valida"}
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