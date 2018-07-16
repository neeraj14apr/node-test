// set up ======================================================================
var express = require('express'),
    app = express(), // create our app w/ express
    mongoose = require('mongoose'), // mongoose for mongodb
    port = process.env.PORT || 8080, // set the port
    database = require('./config/database'), // load the database config
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require(`./logger`),
    EventEmitter = require('events'),
    appEmitter = new EventEmitter()

// configuration ===============================================================
mongoose.connect(database.mongoUrl)
    .then(() => logger.info(`Successfully connected to MongoDB!`))
    .catch((error) => logger.error(`Could not connect due to ${error}`)); // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
let appServer = app.listen(port);

appEmitter.on ( "checkApplication", () => {
    appEmitter.emit ( "getApplication", app )
} )

appEmitter.on ( "closeApplication", () => {
    logger.info (`Pull down initiated`)
    appServer.close()
} )

module.exports = appEmitter