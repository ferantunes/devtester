const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server');
const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('GET /contacts', () => {

    let res;
    let userToken;

    before(async () => {
        const user = { email: 'franja@qaninja.com.br', password: 'pwd123' }

        var server = await init();
    
        await server.inject({
            method: 'POST',
            url: '/user',
            payload: user
        });

        resposta = await server.inject({
            method: 'POST',
            url: '/session',
            payload: user,
            headers: { 'Authorization': userToken }
        });

        userToken = resposta.result.userToken;

    })

    before(async () => {
        var server = await init();

        res = await server.inject({
            method: 'GET',
            url: '/contacts',
            headers: { 'Authorization': userToken }
        });
    });

    it('deve retornar status 200', async () =>{
        expect(res.statusCode).to.equals(200);
    });

    it('deve retornar uma lista', async () => {
        expect(res.result).to.be.array();
    });

});
