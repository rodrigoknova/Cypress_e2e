/// <reference types="cypress" />
const dadosEndereco = require('../fixtures/enderecos.json')
const perfil = require('../fixtures/perfil.json')
let dadoslogin
import Enderecos from '../support/page_objects/enderecos'


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    beforeEach(() => {
        cy.visit('/produtos')

    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Adicionando produtos ao carrinho e Checkout', () => {
        
        cy.addProdutos('Argus All-Weather Tank', 'S', 'Gray', 3)
        cy.addProdutos('Atlas Fitness Tank', 'XS', 'Blue', 5)
        cy.addProdutos('Abominable Hoodie', 'XS', 'Red', 2)
        cy.addProdutos('Apollo Running Short', '34', 'Black', 1)
        
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', '11')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

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

        cy.get('#terms').click()
        cy.get('#place_order').click({ force: true })
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
 








