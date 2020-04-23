describe('My First Test', () => {
    it('Göra ett köp utan att logga in', () => {
        cy.visit('http://localhost:8080/shop');
        //let url ='URLEN LOCALHOST'
        cy.get('[productid = "7"]').click(); //Lägg produkt 7 i varukorg
        cy.get('#miniCartSummary > a > font > strong').should('have.text', '(1)');
        //cy.get('#miniCartSummary > a > font > strong').should('include.text', '1');
        //cy.contains('Checkout').click({force:true});
        cy.get('#miniCartDetails > li.checkout-bg > a').click({force:true});
        //Assertion att det är rätt url
        cy.url().should('include', '/shop/cart/shoppingCart.html')
        
        
        
        
        
        cy.get('selector').type('skriva');
    })
  })