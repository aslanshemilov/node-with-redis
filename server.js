// .index.js

'use strict'

const express = require('express');
// Ceate a new express app
const app = express();

const http = require('http');
// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');

// start server on the specified port and binding host
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

const hostname = '127.0.0.1';
//const port = process.env.PORT || 3000;
//const hostname = appEnv.url || "127.0.0.1";
const port = appEnv.port || 3000;

var path = require("path");
//var pkg = require(path.join(__dirname, "package.json"));

//var favicon = require("serve-favicon");
const moment = require("moment");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//var EJS = require("ejs");


/*
// Parse command line options
var program = require('commander');
program
  .version(pkg.version)
  .option(
    "-p, --port <port>",
    "Port on which to listen to (defaults to 3000)",
    parseInt
  )
  .parse(process.argv);
*/

// Serve static files from the frontend folders
//app.use('/', express.static(path.join(__dirname, 'frontend')));
//static folders
app.use(express.static(path.join(__dirname, 'frontend/public')));
//app.use(express.static(path.join(__dirname, 'src/views')));
app.set('views', path.join(__dirname, 'frontend/views'));
//app.engine("html", EJS.renderFile);
//view engine setup
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public/images/icons
//app.use(favicon(path.join(__dirname, './frontend/public/images/icons/rbc-icon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api.json'}));
//Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use(cookieParser());
// override with the X-HTTP-Method-Override header in the request. simulate DELTE/PUT
//app.use(methodOverride('X-HTTP-Method-Override'));

// required for passport
//app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

// All routes. Connect all our routes to our application
const routing = require("./app/routing")(app); // load our routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err); //The next() is used to hand off the control to the next callback
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('includes/error.ejs', {
            message: err.message,
            error: err
        });
        next(err); //The next() is used to hand off the control to the next callback
    });
}

/*
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('includes/error.ejs', {
        message: err.message,
        error: {}
    });
    next(err); //The next() is used to hand off the control to the next callback
});
*/
/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Everything is setup. Listen on the port.
server.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);
  //console.log('Started at: ', moment(Date.now()).format('MMMM Do YYYY, h:hh:ss a') + ". Listening port " + server.address().port);
  console.log('Started at: ', moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a') + ". Server running/listening at http://" + hostname + port);
});
*/

// Everything is setup. Listen on the port.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${appEnv.port}/`);
  console.log("Environment:", app.get("env"));
});

//exports = module.exports = app; // expose app

