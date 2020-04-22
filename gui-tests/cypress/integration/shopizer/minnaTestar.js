beforeEach(() => {
    adminLogin();
    cy.visit('http://localhost:8080/shop');
  })

describe('Testar lite', () => {
    it('Does not do much!', () => { 
        cy.get('#featuredItemsContainer > div:nth-child(1) > div.product-content.text-center > div > div > a').click(); //Ändra selektor
        //lägg till assert att varukorg visar 1
        cy.get('#miniCartDetails > li.checkout-bg > a').click({force:true});
        //lägg till assert på rätt produkt, price och total
        cy.contains('Proceed to checkout').click();
        cy.get('[name = "customer.billing.firstName"]').type('Testan');
        cy.get('[name = "customer.billing.lastName"]').type('Testsson');
        cy.get('[name = "customer.billing.address"]').type('Testvägen 5');
        cy.get('[name = "customer.billing.city"]').type('Teststaden');
        cy.get('[name = "customer.billing.postalCode"]').type('12345');
        cy.get('[name = "customer.emailAddress"]').type('testan@testsson.se');
        cy.get('[name = "customer.billing.phone"]').type('0701234567');
        cy.get('#submitOrder').click();
    })

   
  })

  function adminLogin(){
    cy.visit('http://localhost:8080/admin');
    cy.get('#username').type('admin');
    cy.get('#password').type('password');
    cy.get('#formSubmitButton').click();
  }