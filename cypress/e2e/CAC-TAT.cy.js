/// <reference types="cypress"/>


describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  }) // pre condicação, estado limpo antes de iniciar os testes
  it('verifica o título da aplicação', function() {
    cy.title('cypress-basico-v2').should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.preencherCamposEnviarComSucesso()
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.testeWrongEmail()
  })


  it('campo continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('wqeadasçl') // digitar campo com string
      .should('have.value', '') // só aceita numero, quando digita algo além de numero, ele tem que retornar o campo vazio
  })


  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    // preenche todos os campos, marcou o check-box do telefone mas, o campo de telefone não foi preenchido
    cy.opcaoNumeroOnCaixaVazia()
  })
 
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    // preencher campos esses campos, verificar os nomes, depois usar a classe clear, e depois verifica os campos vazios,
    cy.preencherELimparCampos()
  })


  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })


  it('seleciona um produto (YouTube) e (mentoria), pelos eu valor Value', function(){
    cy.get('#product') // pegar elemento do tipo select, poderia ser assim: cy.get('select')
      .select('YouTube') // podemos usar também o .select(2), no java scrpit começa do 0, entao 0 1 2
      .should('have.value', 'youtube') // inspecionar o elemento pra ver as options


    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')


    cy.get('#product')
      .select(1) // podemos usar dessa forma também, e embaixo para verificar se é o select que queromos, no caso essa opcao é de blog mas, se embaixo for verificado nome diferente da erro
      .should('have.value', 'blog') // .should('have.value', 'blogg')


  })


  it('marca o tipo de atendimento "Feedback" e verificar value', function() {
    cy.get('input[type="radio"][value="feedback"]') // marca o tipo de atendimento que é feedback
    .check()  // usamos o check para marcar o radio botton
    .should('have.value', 'feedback')  // verificar se o valor foi corretamente verificado
  })


  it('marca cada tipo de atendimento', function() { // marca todos os elementos e verifica todos eles, como também se foram marcados
    cy.get('input[type="radio"]') // especifico para todos os elementos do tipo radio e ver quantos vão retornar. se for mais de 1, pode utilizar a estrutura abaixo
    .should('have.length', 3) // contou quantos tinham
    .each(function($radio) { // each recebe uma função de callback,e, que ele recebe como argumento cada elemeneto que foi selecionado
      cy.wrap($radio).check() // vai impacotar cada um dos radios (os botoes marcados) e vai marcar
      cy.wrap($radio).should('be.checked') // e o checked, vai verificar extamente a funcão acima, se realmente foi marcado
    })  
  })


  it('marca ambos checkboxes, depois desmarca o último', function (){
    cy.get('input[type="checkbox"]')
    .check() // marcou os dois checkbox
    .should('be.checked') // verificou que ambos estão marcados
    .last() // pegou o ultimo que foi marcado
    .uncheck() // desmarcou a ultima opção
    .should('not.be.checked') // verificou se foi desmarcado
  })


  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]#file-upload') // tem esse selector e o id expecifico, para pegar o input do tipo file
    .should('not.have.value') // verificar se n tem nenhum valor
    .selectFile('cypress/fixtures/example.json') // serve para selecionar e fazer upload de arquivos com file e colocou o caminho
    .should(function($input){ // passamos uma função que recebe como uma função de callback, que recebe como  argumento o nosso elemento de nome input, do tipo file
      expect($input[0].files[0].name).to.equal('example.json') // primeiro input que retornou na posicação 0, tem uma propiedade files, que tem um objeto com parametro nomeq na posicão 0
    })
  })


  it('selecionar um arquivo simulando um drag-and-drop', function(){
  cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'}) // essa opção é como se o cliente estivesse arrastando o arquivo e jogando no box do selectfile. caso a opção de cima não funcione, podemos testar dessa forma
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })  


  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){ // dessa forma não precisa pegar o caminho inteiro. Pega a fixture
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile') // ivnes de passar todo caminho, passamos o as
      .should(function($input){  // faz a verificação
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })


  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
    cy.get('#privacy a').should('have.attr', 'target', '_blank') // pra verificar se tem um atributo de nome target, e value tem que ser _blank
    // ele abre em outra aba
  })


  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() { // e podemos fazer uma verificação se abriu a nova aba na mesma pagina
    cy.get('#privacy a')
    .invoke('removeAttr', 'target') // usamos o metodo invoke (), para invocar o metodo removeAttr (atribute), e removemos o atributo target,
    .click() // clicamos, ele carrega outra pagina, na mesma pagina que a fixture está rodando (já que o cypress não consegue interagir com mais abas abertas)
   
    cy.contains('Talking About Testing').should('be.visible')
  })
 

  
})
