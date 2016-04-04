module.exports = function (User) {
    User.validate('name', function (err) {
        if (this.name === 'bad')
            err();
    }, {
        message: 'You have a bad name'
    });
};