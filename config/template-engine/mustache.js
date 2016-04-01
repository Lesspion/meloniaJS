module.exports = {
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
};