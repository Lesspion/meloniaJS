module.exports = {
    "main": "swig",
    "swig": {
        'fileType': 'html',
        'path': process.myEnv.views_folder,
        "instance": require('swig'),
        "extending": require(process.myEnv.tools_folder + '/loader').loadSwigExtension(this.instance)
    }
}