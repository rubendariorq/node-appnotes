const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Initialization
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));         //Analiza las solicitudes entrantes con cargas útiles codificadas por url
app.use(methodOverride('_method'));                     //Permite usar verbos HTTP como PUT o DELETE
app.use(session({
    secret: 'wordsecret',
    resave: true,
    saveUninitialized: true
}));

//Gobal variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server initialization
app.listen(app.get('port'), () => {
    console.log('Server to listening on port', app.get('port'));
});