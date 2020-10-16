const mongoose = require('mongoose');

const schema = mongoose.Schema;

const contactSchema = new schema({
    name: String,
    number: String,
    description: String,
    userId: String
});

module.exports = mongoose.model('Contact', contactSchema);