module.exports = {
    'index': function (request, reply) {
        reply('Hello everybody');
    },
    'home': function (request, reply) {
        reply.view('index', {
            title: 'hello my world',
            mydate: new Date()
        });
    }
};