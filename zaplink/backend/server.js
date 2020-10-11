'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://qaninja:qaninja@cluster0.pxj03.gcp.mongodb.net/zaplinkdb?retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () =>{
    console.log('MongoDB Connected!!');
});

mongoose.connection.on('erros', (er) =>{
    console.log('MongoDB Failed ' + er);
});

console.log(`Ambiente => ${process.env.NODE_ENV}`);

if(process.env.NODE_ENV === 'test') {
    mongoose.connection.dropDatabase();
}

const contactRoutes = require('./routes/contact.routes');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return {
            message: 'Welcome to ZapLink API',
            company: 'QA Ninja',
            course: 'DevTester'
        }
    }
});

server.route(contactRoutes);

server.start((er) => {
    if (er)
        throw err;
    
    console.log('Server running on %s', server.info.uri);
});


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.init = async () => {
    return server;
}