var fs = require('fs');

var load = {};
load.route = function (server) {
    var routes = require(process.myEnv.config_folder + '/routes');
    for (var i in routes) {
        var config = routes[i].config || {};
        var handler;
        var routeObj = {};
        if (typeof routes[i].handler !== "function") {
            var tempHandler = routes[i].handler.split('.');
            var namespace = tempHandler[0];
            var action = tempHandler[1];
            handler = this.routeAction()[namespace][action];
        } else {
            handler = routes[i].handler;
        }
        routeObj.method = routes[i].method;
        routeObj.path = i;
        routeObj.handler = handler;
        routeObj.config = config;
        if (routes[i].vhost) {
            routeObj.vhost = routes[i].vhost;
            console.log(routeObj.vhost);
        }
        
        server.route(routeObj);
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

load.dbEngine = function () {
    var adapterName = process.myEnv['db-engine'];
    var dbConfig = require(process.myEnv.config_folder + "/database-engine/" + adapterName + ".json");
    return dbConfig;
};

load.schemaValidation = function (name, model) {
    var fs = require('fs');
    var model = process.schema.models[name];
    name = name.charAt(0).toLowerCase() + name.slice(1);
    if (fs.existsSync(process.myEnv.dbValidation + '/' + name + '-validation.js')) {
        require(process.myEnv.dbValidation + '/' + name + '-validation.js')(model);
    } else {
        console.log("doesn't exist");
        console.log('path : ', process.myEnv.dbValidation + '/' + name + '-validation.js');
    }
};

load.dbSchema = function () {
    var fs = require('fs');
    var listInDir = fs.readdirSync(process.myEnv.dbSchema);
    for (var i = 0; i < listInDir.length; i++) {
        var name = listInDir[i].split('.')[0];
        var model = require(process.myEnv.dbSchema + '/' + listInDir[i])(process.schema);
        process.schema.define(name, model);
        load.schemaValidation(name);
    }
};

load.helper = function (helperName) {
    return require(process.myEnv.helper + '/' + helperName);
}

module.exports = load;