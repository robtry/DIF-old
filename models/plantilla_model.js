const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;
const nnaSchema = require('./nna_model').nna;
const denunciaSchema = require('./denuncia_model').denuncia;


const plantillaSchema = sequelize_db.define('Plantilla',{
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_tipo: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : tipoSchema,
				key : 'id'
			}
		},
		nombre:      {type: Sequelize.STRING, allowNull: false},
		descripcion: {type: Sequelize.STRING}
		//created at and updated at alerady defined by Sequelize
	},{
		freezeTableName: true, 
		underscored: true, //not use camel case
	}
);

const preguntaSchema = sequelize_db.define('Pregunta', {
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_plantilla: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : plantillaSchema,
				key : 'id'
			}
		},
		pregunta:     {type: Sequelize.STRING, allowNull: false},
		info_llenado: {type: Sequelize.STRING, allowNull: false},
		es_cerrada:   {type: Sequelize.BOOLEAN, allowNull: false}
	}, {
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const opcionSchema = sequelize_db.define('Opcion', {
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_pregunta: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : preguntaSchema,
				key : 'id'
			}
		},
		opcion: {type: Sequelize.STRING, allowNull: false}
	}, {
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const formatSchema = sequelize_db.define('Formato', {
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
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
		},
		id_denuncia: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : denunciaSchema,
				key : 'id'
			}
		}
	}, {
		freezeTableName: true,
		underscored: true,
	}
);

const resSchema = sequelize_db.define('',{
		id: {
			type: Sequelize.UUID,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_formato: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : formatSchema,
				key : 'id'
			}
		},
		id_pregunta: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model : preguntaSchema,
				key : 'id'
			}
		},
		id_opcion: {
			type: Sequelize.INTEGER,
			references: {
				model : opcionSchema,
				key : 'id'
			}
		},
		respuetsa: {type: Sequelize.STRING}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	}
);

const resOpSchema = sequelize_db.define('Respuesta_Opcion',{
	id: {
		type: Sequelize.UUID,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
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
	pregunta : preguntaSchema,
	opcion : opcionSchema,
	formato : formatSchema,
	respuesta : resSchema,
	resop : resOpSchema

}