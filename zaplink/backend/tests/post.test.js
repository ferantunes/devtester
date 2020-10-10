const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server');
const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('POST /contacts', () => {

    let resposta;

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
            payload: contact
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
