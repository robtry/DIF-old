const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const infanteSchema = sequelize.define('Infante', {
    exp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING
    },
    app: {
        type: Sequelize.STRING
    },
    apm: {
        type: Sequelize.STRING
    },
    escolaridad: {
        type: Sequelize.STRING
    },
    ocupacion: {
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.CHAR
    },
    fecha_nacimiento: {
        type: Sequelize.DATEONLY
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});

const psicologoSchema = sequelize.define('Psicologo', {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    app: {
        type: Sequelize.STRING
    },
    apm: {
        type: Sequelize.STRING
    },
    no_cedula: {
        type: Sequelize.STRING
    },
    /*ip_prefil: {
        type: Sequelize.INTEGER,
        allowNull: false
    }*/
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});

const tipoFormatoSchema = sequelize.define('TipoFormato', {
    tipo: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});

const formatoSchema = sequelize.define('Formato', {
    id_infante: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fecha_inicio: {
        type: Sequelize.DATEONLY
    },
    fecha_actualizacion: {
        type: Sequelize.DATEONLY
    },
    descripcion: {
        type: Sequelize.DATEONLY
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});

const psiFormSchema = sequelize.define('Psicologo_Formato', {
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

const preguntaSchema = sequelize.define('Pregunta', {
    id_formato: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pregunta: {
        type: Sequelize.STRING
    },
    respuesta: {
        type: Sequelize.STRING
    },
    info_llenado: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});

const opcionSchema = sequelize.define('Opcion', {
    id_pregunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    opcion: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
});



module.exports = { 
    Infante : infanteSchema,
    Psicologo : psicologoSchema,
    Formato : formatoSchema,
    PsiFor : psiFormSchema,
    Pregunta : preguntaSchema,
    Opcion : opcionSchema,
    TipoFormato : tipoFormatoSchema
    //falta el de user
 };