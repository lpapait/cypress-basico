
//<reference typress='Cypress'/>

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach( () => {
        it('Deve visitar o site', () => {
            cy.visit('./src/index.html')
        })
    })

    it('Verificar o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
})