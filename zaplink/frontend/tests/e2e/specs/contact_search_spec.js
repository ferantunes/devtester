describe('Busca', () => {

    const contact = {
        name: 'Mike Portnoy',
        number: '21987654321',
        description: 'Aulas de Bateria'
    }
    //Apostofro, é usado quando quero fazer uma interpolação com alguma informação
    describe(`Quando busco pelo contato ${contact.name}`, () =>{
        before(() => {
            cy.dash();
            cy.searchContact(contact.number);
            cy.get('#loader', {timetou: 5000}).should('not.visible');
        })

        it('Devo ver somente esse contato no dashboard', () => {
            cy.contactItem().should('have.length', 1);
            cy.contactItem().contains(contact.name);
            cy.contactItem().contains(contact.description);
        })
    })
})