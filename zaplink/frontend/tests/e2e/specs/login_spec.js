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
            cy.doLogin(user.email, user.password);
        });

        it('Deve exibir a área logada', () => {
            cy.contains('h4', 'Seu gerenciador digital de contatos').should('be.visible');
        });
    });

    context('Quando submeto senha incorreta', () => {

        const expectMessage = 'E-mail e/ou senha incorretos!';

        before(() => {
            cy.doLogin(user.email, '123');
        });

        it(`Deve exibir a mensagem ${expectMessage}`, () => {
            cy.loginAlert(expectMessage).should('be.visible');
        });
    });

    context('Quando submeto não informo o email', () => {
        
        const expectMessage = 'Oops. Preencha seu e-mail!';
        
        before(() => {
            cy.doLogin('', '123');
        });

        it(`Deve exibir a mensagem ${expectMessage}`, () => {
            cy.loginAlert(expectMessage).should('be.visible');
        });
    });

    context('Quando submeto não informo a senha', () => {
        
        const expectMessage = 'Oops. Preencha sua senha!';
        
        before(() => {
            cy.doLogin(user.email, '');
        });

        it(`Deve exibir a mensagem ${expectMessage}`, () => {
            cy.loginAlert(expectMessage).should('be.visible');
        });
    });
});