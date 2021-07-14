const path = require('path')
var express = require('express');
var app = express()
var handlebars = require('express-handlebars');
var basicAuth = require('express-basic-auth')

var myAuthorizer = require('./myAuthorizer')
var NoteRouter = require('./routers/noteRouter')
var NoteService = require('./service/noteService')




//Frontend Stuff
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars')

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))


app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: 'My Application'
}));

const noteService = new NoteService(path.join(__dirname, "./stores/notes.json"))

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