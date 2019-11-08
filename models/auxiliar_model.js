const Sequelize = require('sequelize');
const sequelize_db = require('../config/keys');

const derechoSchema = sequelize_db.define('Derecho', {
	id: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	articulo: {type: Sequelize.STRING, allowNull: false},
	derecho:  {type: Sequelize.STRING, allowNull: false}
},{
	freezeTableName: true,
	//underscored: true,
	timestamps: false,
}
);

const escolaridadSchema = sequelize_db.define('Escolaridad',{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nivel: {type: Sequelize.STRING, allowNull: false}
	},{
		freezeTableName: true,
		//underscored: true,
		timestamps: false,
	}
);


const tipoPuSchema = sequelize_db.define('TipoPU', {
		id:{ 
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tipo: { type: Sequelize.STRING, allowNull: false }
	},{
		freezeTableName: true,
		//underscored: true,
		timestamps: false,
	}
);



module.exports = {
	derecho: derechoSchema,
	tipoPu : tipoPuSchema,
	escolaridad : escolaridadSchema
}