const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');
const tipoSchema = require('./auxiliar_model').tipoPu;
const nnaSchema = require('./nna_model').nna;

const datoConsistenteSchema = sequelize_db.define('Dato_Consistente',{
		id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
		dato: {type: Sequelize.STRING, allowNull: false, validate: {
			isAplha: { msg:"Ingrese un dato valido"},
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
		nombre: {type: Sequelize.STRING, allowNull: false, validate:{
            len: { args: [2,200], msg: "El nombre esta fuera de los rangos permitidos [2,200]" }, 
            notEmpty: { msg:"El campo Nombre no puede estar vacío"}, 
        }},
		descripcion: {type: Sequelize.STRING}
		//created at and updated at alerady defined by Sequelize
	},{
		freezeTableName: true, 
		underscored: true,//not use camel case
		timestamp: true
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
			notEmpty: { msg:"El Campo/Pregunta/Subsección que sera agregado no puede estar vacío"}
		}},
		info_llenado:   {type: Sequelize.STRING, validate:{
			notEmpty: { msg:"El campo de información de llenado no puede estar vacío"}
		}},
		//tipo
		es_abierta:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		es_cerrada:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		es_multivalor:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		es_consistente: {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		es_archivo:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		es_subseccion:     {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		envio_opciones: {type: Sequelize.BOOLEAN, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		//dato
		dato_int:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		dato_string:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		dato_text:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		dato_fecha:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
		}},
		dato_hora:   {type: Sequelize.BOOLEAN, allowNull: false, validate:{
			//isIn: { args: [true, false], masg: "Elija una opción valida"}
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
		validate : {
			kindField(){
				let cont = 0;
				const options = new Array(this.es_abierta, this.es_cerrada, this.es_multivalor, this.es_consistente, this.es_archivo, this.es_subseccion);
				options.forEach((v, i, a) => {
					if(v){ cont++ }
				})
				if(cont != 1){
					throw new Error('Se debe seleccionar un Tipo de Pregunta (abierta,opción,...)')
				}
			},
			justOne(){ //data type
				if(
					(this.es_abierta) && (!this.dato_int && !this.dato_string && !this.dato_text && !this.dato_fecha && !this.dato_hora) 
				){
					throw new Error('Si el campo/pregunta es abierta se tiene que elegir un Tipo de Dato')
				}
			},
			validateDatoConstante(){
				if((this.es_consistente) && (this.id_dato_consistente == null)){
					throw new Error('Si el dato/pregunta va a ser constante se debe elegir de donde recuperar la información')
				}
			
			},
			validateCerrada(){
				if(this.es_cerrada && (!this.envio_opciones)){
					throw new Error('Si el campo es de opción u opciones se deben mandar opciones en el formato correcto')
				}
			}
		}
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

const resStrSchema = sequelize_db.define('Respuesta_Str',{
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
		respuesta: {type: Sequelize.STRING, allowNull:false,defaultValue:'', validate: {
			notEmpty: { msg: "Llene los campos requeridos"}
		}}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
	}
);

const resIntSchema = sequelize_db.define('Respuesta_Int',{
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
		respuesta: {type: Sequelize.INTEGER, allowNull:false,defaultValue:'', validate: {
			notEmpty: { msg: "Llene los campos requeridos"}
		}}
	},{
		freezeTableName: true,
		underscored: true,
		timestamps: true,
	}
);

const resTextSchema = sequelize_db.define('Respuesta_Text',{
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
		respuesta: {type: Sequelize.TEXT, allowNull:false,defaultValue:'', validate: {
			notEmpty: { msg: "Llene los campos requeridos"}
		}}
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
				model : resIntSchema,
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

campoSchema.belongsTo(plantillaSchema, {foreignKey: 'id_plantilla', targetKey: 'id'});
plantillaSchema.hasMany(campoSchema, {foreignKey: 'id_plantilla', sourceKey: 'id', onDelete: 'cascade', hooks: true});

formatSchema.belongsTo(plantillaSchema, {foreignKey: 'id_plantilla', targetKey: 'id'});
plantillaSchema.hasMany(formatSchema, {foreignKey: 'id_plantilla', sourceKey: 'id', onDelete: 'cascade', hooks: true});

formatSchema.belongsTo(nnaSchema, {foreignKey: 'id_nna', targetKey: 'exp'});
nnaSchema.hasMany(formatSchema,  {foreignKey: 'id_nna', sourceKey: 'exp'});

opcionSchema.belongsTo(campoSchema, {foreignKey: 'id_campo', targetKey: 'id', onDelete: 'cascade'});
campoSchema.hasMany(opcionSchema,  {foreignKey: 'id_campo', sourceKey: 'id'});

campoSchema.belongsTo(datoConsistenteSchema,  {foreignKey: 'id_dato_consistente', targetKey: 'id'});
datoConsistenteSchema.hasMany(campoSchema,    {foreignKey: 'id_dato_consistente', sourceKey: 'id'});

module.exports = {
	plantilla : plantillaSchema,
	campo : campoSchema,
	opcion : opcionSchema,
	formato : formatSchema,
	respuesta_str : resStrSchema,
	respuesta_int : resIntSchema,
	respuesta_text : resTextSchema,
	resop : resOpSchema,
	datoConst : datoConsistenteSchema
}	