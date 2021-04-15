const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/api/v1/auth', require('./controllers/auth.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
