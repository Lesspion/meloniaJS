var Hapi = require('hapi');
var server = new Hapi.Server();
var swig = require('swig');
process.myEnv = require('./MyEnv');
var templateEngine = require(process.myEnv.config_folder + '/templateEngine');
var load = require(process.myEnv.tools_folder + '/loader');

server.connection({ 
    host: process.myEnv.host || '0.0.0.0', 
    port: process.env.PORT || process.myEnv.port || 8080
});

// Extending Swig


// VIEWS - SWIG
server.register(require('vision'), function (err) {

    if (err) {
        throw err;
    }
    
    var engine= {};
    engine.engines = {};
    engine.engines[templateEngine[templateEngine.main].fileType] = templateEngine[templateEngine.main].extending || templateEngine[templateEngine.main].instance;
    engine.path = templateEngine[templateEngine.main].path || process.myEnv.views_folder
    
    server.views(engine);
});

// ROUTE
load.route(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});