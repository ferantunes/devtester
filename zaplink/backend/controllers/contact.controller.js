const contactModel = require('../models/contact.model');
const { concat } = require('../routes/contact.routes');

module.exports = {
    async create(request, h) {

        // console.log(request.payload);

        const contact = new contactModel({
            name: request.payload.name,
            number: request.payload.number,
            description: request.payload.description
        });

        let result = await contact.save();
        
        return h.response(result).code(200);
    },


    async list(request, h) {
        const contacts = await contactModel.find().exec();
        return contacts;
    }
}