//<reference typress='Cypress'/>
describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verificar o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Pignut hamburg parsley tigernut.,Pignut hamburg parsley tigernut.,Pignut hamburg parsley tigernut.'
        cy.get('#firstName').click().type('Lucas')
        cy.get('#lastName').click().type('Papait Desiderio')
        cy.get('#email').click().type('lucas@papait.com')
        cy.get('#open-text-area').click().type(longText, { delay: 0 })
        cy.get('.button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').click().type('Lucas')
        cy.get('#lastName').click().type('Papait Desiderio')
        cy.get('#email').click().type('lucas@papait,com')
        cy.get('#open-text-area').click().type('teste')
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo númerico continua vazio inserindo valor não-numéricos', () => {
        cy.get('#phone')
            .type('texte')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .click()
            .type('lUCAS')
            .should('have.value', 'lUCAS')
            .clear('')
            .should('have.value', '')
        cy.get('#lastName')
            .click()
            .type('Papait')
            .should('have.value', 'Papait')
            .clear('')
            .should('have.value', '')
        cy.get('#email')
            .click()
            .type('lucas@lucas.com')
            .should('have.value', 'lucas@lucas.com')
            .clear('')
            .should('have.value', '')
        cy.get('#phone')
            .click()
            .type('14999999999')
            .should('have.value', '14999999999')
            .clear('')
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', ()=> {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

})
