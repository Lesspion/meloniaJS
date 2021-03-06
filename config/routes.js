var Joi = require('joi');
module.exports = {
    '/': {
        'method': 'GET',
        'handler': 'index.index'
    },
    '/home': {
        'method': 'GET',
        'handler': 'index.home'
    },
    '/test': {
        'method': 'GET',
        'handler': 'index.test'
    },
    '/mustache': {
        'method': 'GET',
        'handler': 'index.mustache'
    },
    '/handlebars': {
        'method': 'GET',
        'handler': 'index.handlebars'
    },
    '/jade': {
        'method': 'GET',
        'handler': 'index.jade'
    },
    '/nunjucks': {
        'method': 'GET',
        'handler': 'index.nunjucks'
    },
    '/user/{username}': {
        'method': 'GET',
        'handler': 'user.index',
        'config': {
            'validate': {
                'params': {
                    'username': Joi.string().min(3).max(10)
                }
            }
        }
    },
    '/adduser/{name}': {
        'method': 'GET',
        'handler': 'user.add'
    }
};