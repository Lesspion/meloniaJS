module.exports = {
    'fileType':'jade',
    'path': process.myEnv.views_folder,
    'instance': require('jade'),
    'compileOptions': {
        "pretty": true
    }
};