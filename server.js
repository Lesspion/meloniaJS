var Hapi = require('hapi');
var Inert = require("inert");
var server = new Hapi.Server();
process.myEnv = require('./MyEnv');
var htmlEngine = process.myEnv['template-engine'];
var templateEngine = require(process.myEnv.config_folder + '/template-engine/' + htmlEngine + '.js');
var load = require(process.myEnv.tools_folder + '/loader');
var Hoek = require('hoek');

server.connection({ 
    host: process.myEnv.host || '0.0.0.0', 
    port: 80// process.env.PORT || process.myEnv.port || 8080
});

// Extending Swig

// register static serving file
server.register(Inert, function () {});

// VIEWS - SWIG
server.register(require('vision'), function (err) {

    if (err) {
        throw err;
    }
    
    var engine= {};
    engine.engines = {};
    engine.engines[templateEngine.fileType] = templateEngine.extending || templateEngine.instance;
    engine.path = templateEngine.path || process.myEnv.views_folder;
    if (templateEngine.relativeTo) {
        engine.relativeTo = templateEngine.relativeTo;
    }
    if (templateEngine.compileOptions) {
        engine.compileOptions = templateEngine.compileOptions;
    }
    
    server.views(engine);
});

// ROUTE
load.route(server);
load.assets(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});