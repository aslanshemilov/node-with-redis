// .index.js
const express = require('express');
// Ceate a new express app
const app = express();

const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

var path = require("path");
//var pkg = require(path.join(__dirname, "package.json"));

const moment = require("moment");

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
app.use(express.static(path.join(__dirname, '../frontend/public')));
//app.use(express.static(path.join(__dirname, 'src/views')));
app.set('views', path.join(__dirname, '../frontend/views'));
//view engine setup
app.set('view engine', 'ejs');



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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Everything is setup. Listen on the port.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

