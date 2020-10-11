const contactController = require('../controllers/contact.controller');

module.exports = [
    {
        method: 'GET',
        path: '/contacts',
        handler: contactController.list
    },
    {
        method: 'POST',
        path: '/contacts',
        handler: contactController.create
    },
    {
        method: 'DELETE',
        path: '/contacts/{contactId}',
        handler: contactController.remove
    }
]