var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
var passport = require('passport')
var session = require('express-session')
var expressValidator = require('express-validator');


var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');


var app = express();

let handlebars = require('express-handlebars').create({
    defaultLayout: 'main', helpers: {
        flash: require('./views/helpers/flash')
    }
});

// view engine setup
app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());
app.use(require('./modules/requestValidation'));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

//load passport strategies

require('./config/passport/passport.js')(passport, models.user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});


module.exports = app;
