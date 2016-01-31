var Hapi = require('hapi');
var server = new Hapi.Server();
process.myEnv = require('./MyEnv');
var load = require(process.myEnv.tools_folder + '/loader');

server.connection({ 
    host: process.myEnv.host || '0.0.0.0', 
    port: process.env.PORT || process.myEnv.port || 8080
});

// VIEWS - SWIG
server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            html: require('swig')
        },
        path: process.myEnv.views_folder
    });
});

// ROUTE
load.route(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});