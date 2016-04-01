module.exports = {
    'index': function (request, reply) {
        reply('hello : ' + encodeURIComponent(request.params.username));
    }
};