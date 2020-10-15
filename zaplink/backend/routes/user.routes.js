const UserController = require('../controllers/user.controller');

module.exports = [
    {
        method: 'GET',
        path: '/user',
        handler: UserController.create
    },
    {
        method: 'POST',
        path: '/session',
        handler: UserController.login
    }
]