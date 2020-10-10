const contactModel = require('../models/contact.model');
const { concat } = require('../routes/contact.routes');

module.exports = {
    async list(request, h) {
        const contacts = await contactModel.find().exec();
        return contacts;
    }
}