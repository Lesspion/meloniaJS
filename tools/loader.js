var fs = require('fs');

var load = {};
load.route = function (server) {
    var routes = require(process.myEnv.config_folder + '/routes');
    for (var i in routes) {
        var config = routes[i].config || {};
        var handler;
        if (typeof routes[i].handler !== "function") {
            var tempHandler = routes[i].handler.split('.');
            var namespace = tempHandler[0];
            var action = tempHandler[1];
            handler = this.routeAction()[namespace][action];
        } else {
            handler = routes[i].handler;
        }
        server.route({
            method: routes[i].method,
            path: i,
            handler: handler,
            config: config
        });
    }
};

load.routeAction = function () {
    var allAction = fs.readdirSync(process.myEnv.action_folder);
    var routesAction = {};
    for (var i = 0; i < allAction.length; i++) {
        var tempObjectAction = require(process.myEnv.action_folder + '/' + allAction[i]);
        routesAction[allAction[i].substr(0, allAction[i].length - 3)] = tempObjectAction;
    }
    return routesAction;
};

load.loadSwigExtension = function () {
    // load filter && function for swig
    var swig = require('swig');
    var filterObject = require(process.myEnv.tools_folder + '/swigFilter');
    for (var filterName in filterObject) {
        swig.setFilter(filterName, filterObject[filterName]);
    }
    return swig;
};

load.assets = function (server) {
    var assetsList = require(process.myEnv.config_folder + '/assetsList');
    var allRoute = [];
    for (var i in assetsList) {
        var obj = {
            'method': 'GET',
            'path': '/' + i + '/{filename*}',
            'handler': {
                'directory': {
                    'path': assetsList[i],
                    'listing': false,
                    'index': false
                }
            }
        };
        allRoute.push(obj);
    }
    for (var i = 0; i < allRoute.length; i++) {
        server.route(allRoute[i]);
    }
};

module.exports = load;