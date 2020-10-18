describe('Cadastro de Contatos', () => {

    const user = { email: 'jose@bol.com.br', password: 'pwd123' }

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
        cy.get('.dashboard', { timeout: 5000 }).should('be.visible');
    });

    describe('Novo Contato', () => {
        let contact = {
            name: "Fernando Papito",
            number: "11 999999999",
            description: "Orçamento para consultoria em QA e DevOps."
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash();
                cy.createContact(contact);
            });

            it('Deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name);
            });
        });

        describe('Quando submeto o cadastro sem o nome', () => {
            let contact = {
                number: "11 999999999",
                description: "Orçamento para consultoria em QA e DevOps."
            }
    
            before(() => {
                cy.dash();
                cy.createContact(contact);
            });

            const expectNotice = 'Nome é obrigatório.';

            it(`Deve mostrar a notificação ${expectNotice}`, () => {
                cy.alertName().contains(expectNotice);
            });
        });

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            let contact = {
                name: "Fernando Papito",
                description: "Orçamento para consultoria em QA e DevOps."
            }

            before(() => {
                cy.dash();
                cy.createContact(contact);
            });

            const expectNotice = 'WhatsApp é obrigatório.';

            it(`Deve mostrar a notificação ${expectNotice}`, () => {
                cy.alertNumber().contains(expectNotice);
            });
        });

        describe('Quando submeto o cadastro sem o assunto', () => {
            let contact = {
                name: "Fernando Papito",
                number: "11 999999999"
            }

            before(() => {
                cy.dash();
                cy.createContact(contact);
            });

            const expectNotice = 'Assunto é obrigatório.';

            it(`Deve mostrar a notificação ${expectNotice}`, () => {
                cy.alertDescription().contains(expectNotice);
            });
        });
    });
});