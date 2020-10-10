describe('Cadastro de Contatos', () => {

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

            it('Deve mostrar uma notificação', () => {
                cy.alertName().contains('Nome é obrigatório.');
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

            it('Deve mostrar uma notificação', () => {
                cy.alertNumber().contains('WhatsApp é obrigatório.');
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

            it('Deve mostrar uma notificação', () => {
                cy.alertDescription().contains('Assunto é obrigatório.');
            });
        });
    });
});