const path = require('path')
var express = require('express');
var app = express()
var handlebars = require('express-handlebars');
var basicAuth = require('express-basic-auth')

var myAuthorizer = require('./myAuthorizer')
var NoteRouter = require('./routers/noteRouter')
var NoteService = require('./service/noteService')

require("dotenv").config();
const knexConfig=require("./knexfile")["development"];
const knex=require("knex")(knexConfig);
const bodyParser=require("body-parser");
app.use(bodyParser.json());


//Frontend Stuff
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars')

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))


app.use(basicAuth({
    authorizeAsync:true,
    authorizer:myAuthorizer(knex),
    challenge:true,
    realm:"NoteTakingwithknex",
}));

const noteService = new NoteService(knex)

app.get('/', (req, res) => {
    noteService.list(req.auth.user).then((data) => {
        console.log("data", data);
        res.render('index', {
            user: req.auth.user,
            data: data
        })
    })
});
app.use("/sendNote", new NoteRouter(noteService).router())



app.listen(8080)