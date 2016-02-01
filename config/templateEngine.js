module.exports = {
    "main": "swig",
    "swig": {
        'fileType': 'html',
        'path': process.myEnv.views_folder,
        "instance": require('swig'),
        "extending": require(process.myEnv.tools_folder + '/loader').loadSwigExtension()
    },
    'ejs': {
        'fileType': 'ejs',
        'path': process.myEnv.views_folder,
        'relativeTo': process.myEnv.base_folder,
        'instance': require('ejs')
    },
    'mustache': {
        'fileType': 'html',
        'path': process.myEnv.views_folder,
        'relativeTo': process.myEnv.base_folder,
        'instance': {
            'compile': function (template) {
                var Mustache = require('mustache');
                Mustache.parse(template);
                return function (context) {
                    return Mustache.render(template, context);
                };
            }
        }
    },
    'handlebars': {
        'fileType': 'html',
        'path': process.myEnv.views_folder,
        'instance': require('handlebars')
    },
    'jade': {
        'fileType':'jade',
        'path': process.myEnv.views_folder,
        'instance': require('jade'),
        'compileOptions': {
            "pretty": true
        }
    },
    'nunjucks': {
        'fileType': 'html',
        'path': process.myEnv.views_folder,
        'instance': {
            Nunjucks: require('nunjucks'),
            compile: function (src, options) {
                var template = this.Nunjucks.compile(src, options.environment);
                return function (context) {
                    return template.render(context);
                };
            },
            prepare: function (options, next) {
                options.compileOptions.environment = this.Nunjucks.configure(options.path, { watch : false });
                return next();
            }
        }
    }
}