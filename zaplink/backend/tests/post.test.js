const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server');
const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('POST /contacts', () => {

    let resposta;
    let userToken;

    before(async () => {
        const user = { email: 'fernanda@qaninja.com.br', password: 'pwd123' }

        var server = await init();
    
        await server.inject({
            method: 'POST',
            url: '/user',
            payload: user
        });

        resposta = await server.inject({
            method: 'POST',
            url: '/session',
            payload: user
        });

        userToken = resposta.result.userToken;

    })

    describe('quando não tenho acesso', () => {
        before(async () => {
            var server = await init();
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: null,
                headers: { 'Authorization': '123456789101112131415161' }
            });
        });
    
        it('deve retornar status 401', async () =>{
            expect(resposta.statusCode).to.equals(401);
        });
    });

    describe('quando o payload é nulo', () => {
        before(async () => {
            var server = await init();
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: null,
                headers: { 'Authorization': userToken }
            });
        });
    
        it('deve retornar status 400', async () =>{
            expect(resposta.statusCode).to.equals(400);
        });
    });

    describe('quando o payload é bonito', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "48 999999999",
                description: "Teste"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });
    
        it('deve retornar status 200', async () =>{
            expect(resposta.statusCode).to.equals(200);
        });
    
        it('deve retornar o id do contato', async () => {
            // console.log(resposta.result._id);
            expect(resposta.result._id).to.be.a.object();
            expect(resposta.result._id.toString().length).to.equal(24);
        });
    });

    describe('quando o contato já existe', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda Duplicado",
                number: "48999999999",
                description: "Teste"
            }

            await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });            
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });
    
        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });
    });

    describe('quando o payload não tem nome', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                number: "48 999999999",
                description: "Teste"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Name is required.');
        });
    });

    describe('quando o campo nome está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "",
                number: "48 999999999",
                description: "Teste"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Name is required.');
        });
    });

    describe('quando o payload não tem whatsapp', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                description: "Teste"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Number is required.');
        });
    });

    describe('quando o campo whatsapp está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "",
                description: "Teste"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Number is required.');
        });
    });

    describe('quando o payload não tem assunto', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "48 999999999"
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Description is required.');
        });
    });

    describe('quando o campo assunto está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "48 999999999",
                description: ""
            }
    
            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            });
        });

        it('deve retornar status 409', async () =>{
            expect(resposta.statusCode).to.equals(409);
        });

        it('deve retornar uma mensagem', async () =>{
            expect(resposta.result.message).to.equals('Description is required.');
        });
    });
});
