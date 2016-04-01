module.exports = {
    'fileType': 'ejs',
    'path': process.myEnv.views_folder,
    'relativeTo': process.myEnv.base_folder,
    'instance': require('ejs')
};