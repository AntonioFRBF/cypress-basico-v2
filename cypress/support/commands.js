Cypress.Commands.add('preencherCamposEnviarComSucesso', function(){
    const longtext = "antônio é gato"
    cy.get('#firstName').type('Antonio')
    cy.get('#lastName').type('Fernandez')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type(longtext, {dalay: 10}) // objeto de option com a propiedade delay = 0
    cy.get('button[type="submit"]').click()// pega um botao do tipo submit e manda um click nele


    cy.get('.success').should('be.visible')
})




Cypress.Commands.add('testeWrongEmail', function(){
    cy.get('#firstName').type('Antonio')
    cy.get('#lastName').type('Fernandez')
    cy.get('#email').type('teste@gmail.com1')
    cy.get('#open-text-area').type('Antônio é gato') // objeto de option com a propiedade delay = 0
    cy.contains('button', 'Enviar').click()// pega um botao do tipo submit e manda um click nele // e agora é usando o metodo contains, e clica no butom com nome enviar


    cy.get('.error').should('be.visible')
})




Cypress.Commands.add('opcaoNumeroOnCaixaVazia', function(){
    cy.get('#firstName').type('Antonio')
    cy.get('#lastName').type('Fernandez')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Antônio é gato')
    cy.contains('button', 'Enviar').click()// pega um botao do tipo submit e manda um click nele
    cy.get('.error').should('be.visible')
})


Cypress.Commands.add('preencherELimparCampos', function(){
    cy.get('#firstName').type('Antonio')
    .should('have.value', 'Antonio')
    .clear()
    .should('have.value', '')
    cy.get('#lastName').type('Fernandez')
    .should('have.value', 'Fernandez')
    .clear()
    .should('have.value', '')
    cy.get('#email').type('teste@gmail.com')
    .should('have.value', 'teste@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone').type('12312312')
    .should('have.value', '12312312')
    .clear()
    .should('have.value', '')
})
