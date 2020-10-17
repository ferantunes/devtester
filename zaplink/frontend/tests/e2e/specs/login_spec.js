describe('Login', () => {

    const user = { email: 'fernanda@qaninja.com.br', password: 'pwd123' }

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Contenty-Type': 'application/json' },
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
        })
    });

    context('Quando submeto credenciais validas', () => {
        before(() => {
            cy.visit('/');
            cy.get('input[name=email]').type(user.email);
            cy.get('input[name=password]').type(user.password);
            cy.get('#sigIn').click();
        });

        it('Deve exibir a área logada', () => {
            cy.contains('h4', 'Seu gerenciador digital de contatos').should('be.visible');
        });
    });
});