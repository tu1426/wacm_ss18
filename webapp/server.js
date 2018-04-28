//TODO: test with docker, colors? ^^, readme
'use strict';

// set timezone
process.env.TZ = 'Europe/Vienna';

// get dependencies
let express = require('express'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    fs = require("fs"),
    morgan = require('morgan'),
    _ = require('lodash'),
    optionsParser = require('options-parser'),
    mongoose = require('mongoose'),
    dbEvents = mongoose.connection,
    cookieParser = require('cookie-parser'),
    format = require('string-format');


// initialize variables
let CONFIG,
    URLS = JSON.parse(fs.readFileSync('./config/urls.json'));

// parse command line options
let options = optionsParser.parse({
  conf: { short: 'c', varName: '<CONFIG-FILE>' },
  help: {
    short: 'h',
    showHelp: {
      banner: 'node server.js [options]'
    }
  }
});

// parse config file
if(options.opt.conf){
  // load config file from command line
  process.env['CONFIG_FILE'] = options.opt.conf;
} else{
  // default config file
  process.env['CONFIG_FILE'] = './config/default_config.json';
}
CONFIG = JSON.parse(fs.readFileSync(process.env['CONFIG_FILE']));

// create express app
const app = express();

process.on('warning', e => console.error(e.stack));

// add morgan logger and point it to log object
app.use(morgan('[REST: :method] [url: :url] - [res-status: :status] [res-length: :res[content-length]] [res-time: :response-time ms]',
  {stream: {write: (msg) => {
    console.log(msg.substring(0, msg.lastIndexOf('\n')));
  }}}));

// use middleware
app.use(cookieParser());

// set env variable for mongo connection
mongoose.Promise = global.Promise;
let mongoConnectionString = 'mongodb://' + CONFIG.mongo_host + ':' + CONFIG.mongo_port + '/' + CONFIG.mongo_db_name;
process.env['MONGO_CONNECTION_STRING'] = mongoConnectionString;

//connect to database, use database events to catch errors and reconnect
dbEvents.on('connecting', () => {
  console.log('#### connecting to database... ####');
});
dbEvents.on('error', (error) => {
  console.error('#### database error: ' + error.message + ' ####');
});
dbEvents.on('connected', () => {
  console.log('#### database connected ####');
});
dbEvents.on('disconnected', () => {
  console.log('#### database disconnected ####');
  setTimeout(() => connectToMongo(process.env['MONGO_CONNECTION_STRING']), 2000);
});
connectToMongo(process.env['MONGO_CONNECTION_STRING']);

// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', ensureSecure);

// point static path to dist
app.use(express.static(path.join(__dirname, './frontend')));

//TODO: get and apply api routes here if new ones created
// get our API routes
const users = require('./backend/routes/users');
const counters = require('./backend/routes/counters');
const data = require('./backend/routes/data');
// apply API routes
app.use(URLS.api + URLS.user, users);
app.use(URLS.api + URLS.counter, counters);
app.use(URLS.api + URLS.data, data);

// catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

// custom error handler middleware for errors
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON request');
    return res.status(400).json('Ups...something went wrong! There was a bad JSON in the request.');
  } else if(err && err.name === 'Error' && err.message){
    console.error('Error occured: {}', err.message);
    return res.status(400).json({success: false, message: err.message});
  } else{
    next();
  }
});

const serverConfig = {
  key: fs.readFileSync('./backend/resources/certs/key.pem'),
  cert: fs.readFileSync('./backend/resources/certs/cert.pem')
};

// start servers
http.createServer(app).listen(CONFIG.port);
https.createServer(serverConfig, app).listen(CONFIG.secure_port);

function ensureSecure(req, res, next){
  if(req.secure){
    return next();
  }
  res.redirect('https://'+req.hostname+':' + CONFIG.secure_port + req.url);
}


console.log('#### wacm_group13 API running on https://localhost:' + CONFIG.secure_port +'/api/ ####');

// ####################################################################################################################

function connectToMongo(connectionString) {
  mongoose.connect(connectionString, {auto_reconnect:false})
    .catch(err => {
      setTimeout(() => connectToMongo(connectionString), 2000);
    });
}