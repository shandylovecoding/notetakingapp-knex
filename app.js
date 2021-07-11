const fs = require('fs')
const path = require('path')

var express = require('express');
var app = express()
var handlebars = require('express-handlebars');
var basicAuth = require('express-basic-auth')

var myAuthorizer = require('./myAuthorizer')
var ViewRouter = require('./viewRouter')


//Frontend Stuff
app.engine('handlebars', handlebars());
    app.set('view engine','handlebars')

//Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("public"))


app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: 'My Application'
}));

app.use('/', new ViewRouter().router())

app.post('/postNotes', function(req, res){
    console.log(req.body.title);
   res.send(req.body.comment);

});

app.listen(8000)