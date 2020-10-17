describe('Conversar', () => {

    const user = { email: 'fulano@yahoo.com', password: '123abc' }

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
    });

    const contact = {
        name: 'Maiara e Maraisa',
        number: '11987654321',
        description: 'Orçamento para show da virada'
    }
    
    context(`Dado que quero conversar com o contato ${contact.name}`, () => {
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

        it('Quando acesso o dashboard', () => {
            cy.dash();
        })

        it('Devo ver a propriedade href com o link do WhatsApp Web', () => {
            const externalLink = `https://api.whatsapp.com/send/?phone=55${contact.number}`;
            cy.get(`a[href$="${contact.number}"]`).should('have.attr', 'href', externalLink);
        });
    })
})