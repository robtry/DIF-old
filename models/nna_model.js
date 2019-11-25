const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const derechoSchema = require('./auxiliar_model').derecho;
const escolaridadSchema = require('./auxiliar_model').escolaridad;
const enfermedadSchema = require('./auxiliar_model').enfermedad;

const nnaSchema = sequelize_db.define('NNA', {
        exp: {type: Sequelize.STRING, allowNull: false, primaryKey: true, unique: true, validate:{
            notEmpty: { msg:"El campo Expediente no puede estar vacío"},
        }},
        nombre: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [2,20], msg: "El nombre esta fuera de los rangos permitidos [2,20]" }, 
            notEmpty: { msg:"El campo nombre no puede estar vacío"}, 
            is:  { args : /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ ?)+/, msg: "Ingrese un Nombre válido"},
        }},
        app: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [2,20], msg: "El Apellido Paterno esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo Apellido Paterno no puede estar vacío"}, 
            is:  { args : /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ ?)+/, msg: "Ingrese un Apellido Paterno válido"},
        }},
        apm: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [2,20], msg: "El Apellido Materno esta fuera de los rangos permitidos [2,20]" },
            notEmpty: { msg:"El campo Apellido Materno no puede estar vacío"}, 
            is:  { args : /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ ?)+/, msg: "Ingrese un Apellido Materno válido"},
        }},
        fecha_nacimiento: {type: Sequelize.DATEONLY, validate:{
            isDate: { msg:"Ingrese una fecha válida"},
            isBefore: { args: [new Date().toISOString().slice(0,10)], msg: "Ingrese una fecha válida"}
        }},
        sexo: {type: Sequelize.CHAR, validate:{
            isIn: {args: ['m','f'], msg: "Ingrese un sexo válido"}
        }},
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
        }
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

const domicilioSchema = sequelize_db.define('Domicilio', {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    id_nna: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model : nnaSchema,
            key : 'exp'
        }
    },
    calle: {type: Sequelize.STRING, validate:{
        len: { args: [2,255], msg: "La calle esta fuera de los rangos permitidos [2,255]" }, 
        notEmpty: { msg:"El campo calle no puede estar vacío"},
    }},
    no_ext: {type: Sequelize.STRING, validate:{
        len: { args: [2,10], msg: "El número exterior esta fuera de los rangos permitidos [2,10]" }, 
        notEmpty: { msg:"El campo número exterior no puede estar vacío"},
    }},
    no_int: {type: Sequelize.STRING, validate:{
        len: { args: [2,10], msg: "El número interior esta fuera de los rangos permitidos [2,10]" }, 
        notEmpty: { msg:"El campo número interior no puede estar vacío"},
    }},
    municipio: {type: Sequelize.STRING, validate:{
        len: { args: [2,100], msg: "El municipio esta fuera de los rangos permitidos [2,100]" }, 
        notEmpty: { msg:"El campo municipio no puede estar vacío"},
    }},
    colonia: {type: Sequelize.STRING, validate:{
        len: { args: [2,100], msg: "La colonia esta fuera de los rangos permitidos [2,100]" }, 
        notEmpty: { msg:"El campo colonia no puede estar vacío"},
    }},
    cp: {type: Sequelize.STRING, validate:{
        len: { args: [4,6], msg: "Tamaño incorrecto para el códgo postal" }, 
        notEmpty: { msg:"El campo código postal no puede estar vacío"},
    }},
    entre_calles: {type: Sequelize.STRING, validate:{
        len: { args: [4,250], msg: "Las calles de refrencia se encentran fuera de los rangos permitidos [2,250]" }, 
        notEmpty: { msg:"El de calles de referencia nombre no puede estar vacío"},
    }},
    },{
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    }
);

nnaSchema.belongsToMany(enfermedadSchema, {through: nnaEnfermedadSchema, foreignKey: 'id_nna', otherKey: 'id_nna'});
enfermedadSchema.belongsToMany(nnaSchema, {through: nnaEnfermedadSchema, foreignKey: 'id',  otherKey: 'id_enfermedad'});

nnaSchema.belongsToMany(derechoSchema, {through: nnaDerechoSchema, foreignKey: 'id_nna', otherKey: 'id_nna'});
enfermedadSchema.belongsToMany(nnaSchema, {through: nnaDerechoSchema, foreignKey: 'id',  otherKey: 'id_derecho'});

nnaSchema.belongsTo(escolaridadSchema, {foreignKey: 'id_escolaridad', targetKey: 'id'});
escolaridadSchema.hasMany(nnaSchema,  {foreignKey: 'id_escolaridad', sourceKey: 'id'});

domicilioSchema.belongsTo(nnaSchema, {foreignKey: 'id_nna', targetKey: 'exp'});
nnaSchema.hasMany(domicilioSchema,  {foreignKey: 'id_nna', sourceKey: 'exp'});



module.exports = {
    nna : nnaSchema,
    nnaDerecho : nnaDerechoSchema,
    nnaEnfermedad : nnaEnfermedadSchema,
    domicilio : domicilioSchema
}