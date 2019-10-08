const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('dif_psicologia', 'robgg', '123456', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    }
  }
});