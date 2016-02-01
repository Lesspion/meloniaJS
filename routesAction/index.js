module.exports = {
    'index': function (request, reply) {
        reply('Hello everybody');
    },
    'home': function (request, reply) {
        reply.view('index', {
            title: 'hello my world',
            mydate: new Date()
        });
    },
    'test': function (request, reply) {
        reply.view('test', {
            supplies: [0, 1, 2]
        });
    },
    'mustache': function (request, reply) {
        reply.view('mustache', {
            'name': 'Mustachify'
        });
    },
    'handlebars': function (request, reply) {
        reply.view('handlebars', {
            'name': "handling"
        })
    },
    'jade': function (request, reply) {
        reply.view('jade', {
            names: "personne"
        });
    },
    'nunjucks': function (request, reply) {
        reply.view('nunjucks', {
            title: "nunja",
            items: {
                'boulou': 'bala',
                'bili': 'bulu',
                'freak': 'dev'
            }
        })
    }
};