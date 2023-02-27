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
        cy.get('#firstName')
            .click()
            .type('Lucas')
        cy.get('#lastName')
            .click()
            .type('Papait Desiderio')
        cy.get('#email')
            .click()
            .type('lucas@papait.com')
        cy.get('#open-text-area')
            .click()
            .type(longText, {
                delay: 0
            })
        cy.contains('button', 'Enviar').click()
        cy.get('.success')
            .should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .click()
            .type('Lucas')
        cy.get('#lastName')
            .click()
            .type('Papait Desiderio')
        cy.get('#email')
            .click()
            .type('lucas@papait,com')
        cy.get('#open-text-area')
            .click()
            .type('teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('Campo númerico continua vazio inserindo valor não-numéricos', () => {
        cy.get('#phone')
            .type('texte')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')

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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(($input) => {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.jason').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input) => {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    })





    it('Encontre o gato escondido', ()=> {
       cy.get('#cat')
       .invoke('show')
       .should('be.visible') 
       cy.get('#title')
       .invoke('text', 'CAC TAT')
       cy.get('#subtitle')
       .invoke('text', 'EU AMOGAtos')
    })
})