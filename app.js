const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view egine', 'handlebars')

const PORT = process.env.PORT || 5000;

//app.get('/', (req, res) => res.send('INDEX'))

app.use('/', require('./routes/main'))

app.listen(PORT, console.log(`Server started on port ${PORT}`))