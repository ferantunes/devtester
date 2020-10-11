const contactModel = require('../models/contact.model');
const { concat } = require('../routes/contact.routes');

module.exports = {
    async create(request, h) {

        // console.log(request.payload);

        if (request.payload === null)
            return h.response({ message: 'Not JSON.' }).code(400);

        const contact = new contactModel({
            name: request.payload.name,
            number: request.payload.number,
            description: request.payload.description
        });

        if (!contact.name)
            return h.response({ message: 'Name is required.' }).code(409);

        if (!contact.number)
            return h.response({ message: 'Number is required.' }).code(409);

        if (!contact.description)
            return h.response({ message: 'Description is required.' }).code(409);

        const duplicado = await contactModel.findOne({number: contact.number}).exec();

        if (duplicado)
            return h.response({error: 'Duplicated number.'}).code(409);

        try {
            let result = await contact.save();
            return h.response(result).code(200);
        } catch (error) {
            return h.response(error).code(500);
        }
    },


    async list(request, h) {
        const contacts = await contactModel.find().exec();
        return contacts;
    }
}