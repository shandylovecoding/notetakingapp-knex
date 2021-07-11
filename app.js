var express = require('express');
var handlebars = require('express-handlebars');
var ViewRouter = require('./viewRouter')
var app = express()

app.use(express.static("public"))
app.engine('handlebars', handlebars());
    app.set('view engine','handlebars')
    app.set('views', __dirname + '/views');

app.use('/', new ViewRouter().router())

app.listen(8000)