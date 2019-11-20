const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize_con = require('./config/keys');

// Override timezone formatting for MSSQL
require('sequelize').DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};


//Routes
const welcomeRouter = require('./routes/welcomeRoute');
const usuarioRouter = require('./routes/usuarioRoute');
const nnaRouter     = require('./routes/nnaRoute');

// Database Connection
sequelize_con
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

// HandleBars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body-Parser
app.use(bodyParser.urlencoded({ extended : false }));

// Static Directory
app.use(express.static(path.join(__dirname, 'public')));

//Port
const PORT = process.env.PORT || 5000;

// Set up Routes
app.use(welcomeRouter);
app.use(usuarioRouter);
app.use(nnaRouter);


app.listen(PORT, console.log(`Server started on port ${PORT}`))