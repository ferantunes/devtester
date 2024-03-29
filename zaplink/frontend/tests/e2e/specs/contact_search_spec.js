describe('Busca', () => {

    const user = { email: 'maria.joao@gmail.com', password: 'abc123' }

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Contenty-Type': 'application/json' },
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
        });

        cy.doLogin(user.email, user.password);
        cy.get('.dashboard', { timeout: 5000 }).should('be.visible')
    })

    const contact = {
        name: 'Mike Portnoy',
        number: '21987654321',
        description: 'Aulas de Bateria'
    }
    //Apostofro, é usado quando quero fazer uma interpolação com alguma informação
    context(`Dado que eu tenho o seguinte contato ${contact.name}`, () => {
        before(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user_token')
                },
                body: contact,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
            })
        })

        it('Quando faço a busca desse contato', () => {
            cy.dash();
            cy.searchContact(contact.number);
            cy.get('#loader', { timetou: 5000 }).should('not.visible');
        })

        it('Devo ver somente esse contato no dashboard', () => {
            cy.contactItem().should('have.length', 1);
            cy.contactItem().contains(contact.name);
            cy.contactItem().contains(contact.description);
        })
    })

    context('Quando busco por um contato não cadastrado', () => {
        before(() => {
            cy.dash();
            cy.searchContact('11555555555');
            cy.get('#loader', { timetou: 5000 }).should('not.visible');
        })

        it('Deve retornar mensagem de alerta', () => {
            cy.get('.message-body').contains('Contato não encontrado.');
        });
    })
})