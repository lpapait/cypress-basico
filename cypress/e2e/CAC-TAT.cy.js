//<reference typress='Cypress'/>
describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach( ()=> {
        cy.visit('./src/index.html')
    })

    it('Verificar o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', ()=> {
        const longText = 'Pignut hamburg parsley tigernut.,Pignut hamburg parsley tigernut.,Pignut hamburg parsley tigernut.'
        cy.get('#firstName').click().type('Lucas')
        cy.get('#lastName').click().type('Papait Desiderio')
        cy.get('#email').click().type('lucas@papait.com')
        cy.get('#open-text-area').click().type(longText, {delay:0})
        cy.get('.button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})