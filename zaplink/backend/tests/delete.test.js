const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server');
const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('DELETE /contacts', () => {

    describe('Dado que eu tenho um contato indesejado', () => {

        let contact = {
            name: 'Joaquim Xavier',
            number: '11 987654321',
            description: 'Corretor de Imóveis'
        }
        
        let server;
        let resposta;
        let contactId;

        before(async () => {
            server = await init();

            resposta = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact
            });

            contactId = resposta.result._id;
        });

        it('quando eu apago esse contato', async () => {
            resposta = await server.inject({
                method: 'DELETE',
                url: '/contacts/' + contactId,
                payload: contact
            });
        });

        it('deve retornar 204', () => {
            expect(resposta.statusCode).to.equal(204);
        });
    })

});
