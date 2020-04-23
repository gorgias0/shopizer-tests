describe('Helena Testar', () => {
    it('Does not do much!Göra ett köp utan att logga in', () => {
      cy.visit('http://localhost:8080/shop/');
      cy.get('[productid="7"]').click();//Komentar
      cy.get('#miniCartSummary > a > font > strong').should('include.text','1');
      //cy.contains('Checkout').click({force:true});
      cy.get('#miniCartDetails > li.checkout-bg > a').click({force:true});
      cy.url().should('include', '/shop/cart/shoppingCart.html');

    })
  })