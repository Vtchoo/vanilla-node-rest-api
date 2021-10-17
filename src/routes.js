const UsersController = require("./controllers/UsersController");

module.exports = [
    {
        endpoint: '/users',
        method: 'GET',
        handler: UsersController.listUsers
    },
    {
        endpoint: '/users/:id',
        method: 'GET',
        handler: UsersController.getUserById
    },
    {
        endpoint: '/users',
        method: 'POST',
        handler: UsersController.createUser
    },
    {
        endpoint: '/users/:id',
        method: 'PUT',
        handler: UsersController.editUser
    },
    {
        endpoint: '/users/:id',
        method: 'DELETE',
        handler: UsersController.deleteUser
    },
]