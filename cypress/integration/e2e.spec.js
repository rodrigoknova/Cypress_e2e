/// <reference types="cypress" />
var faker = require('faker');
const dadosEndereco = require('../fixtures/enderecos.json')
import Enderecos from '../support/page_objects/enderecos'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    let emailFaker = faker.internet.email()
    let nomeFaker = faker.name.firstName()
    let sobrenomeFaker = faker.name.lastName()

    beforeEach(() => {
        cy.visit('/')
    });

    afterEach(() => {
        cy.screenshot()
    });


    it('Cadastro de conta e configuração de endereço', () => {

        cy.visit('/minha-conta/')

        cy.preCadastro(emailFaker, 'teste@teste', nomeFaker, sobrenomeFaker)
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

        Enderecos.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.get(':nth-child(2) > .title > .edit').click()

        Enderecos.editarEnderecoEntrega(
            dadosEndereco[2].nome,
            dadosEndereco[2].sobrenome,
            dadosEndereco[2].empresa,
            dadosEndereco[2].pais,
            dadosEndereco[2].endereco,
            dadosEndereco[2].endereco2,
            dadosEndereco[2].cidade,
            dadosEndereco[2].estado,
            dadosEndereco[2].cep
        )

    });

    it('Adicionando produtos ao carrinho e Checkout', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Argus All-Weather Tank', 'S', 'Gray', 3)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'XS', 'Green', 5)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Abominable Hoodie', 'XS', 'Green', 2)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Apollo Running Short', '32', 'Black', 1)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', '11')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('.showlogin').click()
        cy.get('#username').type(emailFaker)
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-button').click()
        cy.get('#terms').click()
        cy.get('#place_order').click({force: true})
        cy.wait(7000)
        cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')
    });
});









