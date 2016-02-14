module.exports = {
    "port": process.env.PORT || 8080,
    "host": process.env.IP || "0.0.0.0",
    "domain_name": 'lesspion.fr',
    "base_folder": __dirname,
    "views_folder": __dirname + '/views',
    "assets_folder": __dirname + "/assets",
    "config_folder": __dirname + '/config',
    "tools_folder": __dirname + '/tools',
    'action_folder': __dirname + '/routesAction',
    'bower_folder': __dirname + '/bower_components',
};