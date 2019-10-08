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

app.engine('handlebars', exphbs({defaultLayout: 'home'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;


app.use('/', require('./routes/main'))

app.listen(PORT, console.log(`Server started on port ${PORT}`))