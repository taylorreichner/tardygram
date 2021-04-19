const express = require('express');
const app = express();

app.use(require('cookie-parser')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', require('./controllers/auth.js'));



app.use('/api/v1/comments', require('./controllers/comments-router.js'));
app.use('/api/v1/grams', require('./controllers/grams-router.js'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
