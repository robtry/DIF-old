const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;
const nnaSchema = require('./nna_model').nna;

const datoConsistenteSchema = sequelize_db.define('Dato_Consistente',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		dato: {type: Sequelize.STRING, allowNull: false, validate: {
			isAplhanumeric: { msg:"Ingrese un dato valido"},
			notEmpty: { msg:"El campo nombre no puede estar vacio"}
		}},
		es_multivalor: {type: Sequelize.BOOLEAN, allowNull: false}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const plantillaSchema = sequelize_db.define('Plantilla',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_tipo: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : tipoSchema,
				key : 'id'
			}
		},
		nombre:      {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [[2,20]], msg: "El nombre esta fuera de los rangos permitidos [2,20]" }, 
            notEmpty: { msg:"El campo nombre no puede estar vacio"}, 
            isAlpha: {msg: "Solo se aceptan letras en el nombre"} 
        }},
		descripcion: {type: Sequelize.STRING}
		//created at and updated at alerady defined by Sequelize
	},{
		freezeTableName: true, 
		underscored: true, //not use camel case
		//timestamp true
	}
);

const campoSchema = sequelize_db.define('Campo', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_plantilla: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : plantillaSchema,
				key : 'id'
			}
		},
		pregunta:       {type: Sequelize.STRING, allowNull: false, validate:{
			notEmpty: { msg:"El campo pregunta no puede estar vacio"}
		}},
		info_llenado:   {type: Sequelize.STRING, allowNull: false, validate:{
			notEmpty: { msg:"El campo info_llenado no puede estar vacio"}
		}},
		es_cerrada:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			isIn: { args: [[true, false]], masg: "Elija una opción valida"}
		}},
		es_consistente: {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			isIn: { args: [[true, false]], masg: "Elija una opción valida"}
		}},
		es_archivo:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			isIn: { args: [[true, false]], masg: "Elija una opción valida"}
		}},
		id_dato_consistente: {
			type: Sequelize.INTEGER,
			references: {
				model : datoConsistenteSchema,
				key : 'id'
			}
		}

	}, {
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const opcionSchema = sequelize_db.define('Opcion', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_campo: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : campoSchema,
				key : 'id'
			}
		},
		opcion: {type: Sequelize.STRING, allowNull: false, validate:{
			notEmpty: { msg:"LLene los campos solicitados"}
		}}
	}, {
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const formatSchema = sequelize_db.define('Formato', {
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_nna: {
			type: Sequelize.STRING,
            allowNull: false,
            references: {
                model : nnaSchema,
                key : 'exp'
            }
		},
		id_plantilla: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : plantillaSchema,
				key : 'id'
			}
		}
	}, {
		freezeTableName: true,
		underscored: true,
	}
);

const resSchema = sequelize_db.define('Respuesta',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_formato: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : formatSchema,
				key : 'id'
			}
		},
		id_campo: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : campoSchema,
				key : 'id'
			}
		},
		respuetsa: {type: Sequelize.STRING, allowNull:false,defaultValue:''}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
	}
);

const resOpSchema = sequelize_db.define('Respuesta_Opcion',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		id_respuesta: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : resSchema,
				key : 'id'
			}
		},
		id_opcion: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : opcionSchema,
				key : 'id'
			}
		},
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

module.exports = {
	plantilla : plantillaSchema,
	campo : campoSchema,
	opcion : opcionSchema,
	formato : formatSchema,
	respuesta : resSchema,
	resop : resOpSchema,
	datoConst : datoConsistenteSchema
}