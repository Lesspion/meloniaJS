module.exports = {
    'index': function (request, reply) {
        var User = process.schema.models.User;
        User.find(function (err, users) {
            reply('hello : ' + encodeURIComponent(request.params.username) + '<br>Users: ' + JSON.stringify(users));
        });
    },
    'add': function (request, reply) {
        var User = process.schema.models.User;
        var user = new User();
        user.name = request.params.name;
        console.log(user.name);
        console.log(user.isValid());
        if (!user.isValid())
            reply('an error occcured');
                
        user.save(function (err) {
            if (err)
                console.log(err);
            reply('user saved');
        });
    }
};