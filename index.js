const express = require('express');
const app = express();
const {dbConnection} = require('./config/config.js');
require('dotenv').config();
const {PORT} = process.env;

dbConnection();

app.use(express.json());

app.use('/task', require('./routes/tasks.js'));


app.listen(PORT, ()=> console.log(`El servidor se ha levantado en el puerto ${PORT}`));

module.exports = app;