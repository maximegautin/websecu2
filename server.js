'use strict';

/**
 * Module dependencies.
 */

 // Initializing system variables
var express = require('express');
var  fs = require('fs');
var  mongoose = require('mongoose');
var https = require ('https');
var env = require("./server/config/config.js");
var bodyParser = require("body-parser");
var cors = require('cors');
var morgan = require('morgan');

//var passport = require('passport');


var sslOptions = {
    key: fs.readFileSync('./app/assets/key.pem'),
    cert: fs.readFileSync('./app/assets/cert.pem'),
    passphrase: "phat"

};
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */




mongoose.connect(env.db);


var app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());



require('./server/silos/userSilo')(app);
require('./server/silos/videoSilo')(app);
require('./server/silos/playlistSilo')(app);
require('./server/silos/logSilo')(app);





app.get('/', function(req, res){
    res.send('le serveur est en marche ...');
});

app.get('/*', function(req, res){

    res.send('le serveur a répondu : Chemin incorrect !')
});

var port = env.port;
var server = https.createServer(sslOptions, app).listen(port || process.env.PORT);

console.log('Démarrage du server Node sur le port '+ port);

module.exports = server;
