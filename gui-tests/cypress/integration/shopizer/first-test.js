

describe("Test shopizer", function() {
    this.beforeAll('open shopizer', function(){
        var url = "http://127.0.0.1:8080/shop/"
        cy.visit(url);
    });

     it("First test", function() {
        cy.get("a").contains("Laptop Bags").click();
        
        cy.get('a[productid="2"]').first().click();
        cy.get('#miniCartDetails > li.checkout-bg > a').click({force:true});
        cy.get('a').contains('Proceed to checkout').click();
    });

    it.only('create account', () => {
        cy.contains('My Account').click();
        cy.get('#registerLink').click();
        cy.get('[name = "billing.firstName"]').type('Testan');
        cy.get('[name = "billing.lastName"]').type('Testsson');
        cy.get('#registration_country').select('Sweden');
        cy.get('[name = "billing.stateProvince"]').type('Teststaden');
        cy.get('[name = "emailAddress"]').type('testan2@testsson.se');
        cy.get('[name = "password"]').type('password1');
        cy.get('#passwordAgain').type('password1');

        // submit form
        cy.get('[type="submit"]').click();

        // open my account info
        //cy.get('a').contains('My Account').click()
        //cy.get('#customer.errors').
   })


})
