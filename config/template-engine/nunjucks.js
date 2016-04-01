module.exports = {
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
};