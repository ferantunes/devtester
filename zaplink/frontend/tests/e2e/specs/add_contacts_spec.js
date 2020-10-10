describe('Cadastro de Contatos', () => {

    describe('Novo Contato', () => {
        let contact = {
            name: "Fernando Papito",
            number: "11 999999999",
            description: "Orçamento para consultoria em QA e DevOps."
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.visit('/dashboard');
                cy.get('#addNewContact').click();

                cy.get('.input-name input').type(contact.name);
                cy.get('.input-number input').type(contact.number);
                cy.get('.text-description textarea').type(contact.description);

                cy.get('#saveButton').click();
            });

            it('Deve cadastrar esse contato', () => {
                cy.get('.contact-list').contains(contact.name);
            });
        });

        describe('Quando submeto o cadastro sem o nome', () => {
            before(() => {
                cy.visit('/dashboard');
                cy.get('#addNewContact').click();

                cy.get('.input-number input').type(contact.number);
                cy.get('.text-description textarea').type(contact.description);

                cy.get('#saveButton').click();
            });

            it('Deve mostrar uma notificação', () => {
                cy.get('.input-name small').contains('Nome é obrigatório.');
            });
        });

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            before(() => {
                cy.visit('/dashboard');
                cy.get('#addNewContact').click();
                
                cy.get('.input-name input').type(contact.name);
                cy.get('.text-description textarea').type(contact.description);

                cy.get('#saveButton').click();
            });

            it('Deve mostrar uma notificação', () => {
                cy.get('.input-number small').contains('WhatsApp é obrigatório.');
            });
        });

        describe('Quando submeto o cadastro sem o assunto', () => {
            before(() => {
                cy.visit('/dashboard');
                cy.get('#addNewContact').click();
                
                cy.get('.input-name input').type(contact.name);
                cy.get('.input-number input').type(contact.number);

                cy.get('#saveButton').click();
            });

            it('Deve mostrar uma notificação', () => {
                cy.get('.text-description small').contains('Assunto é obrigatório.');
            });
        });
    });
});