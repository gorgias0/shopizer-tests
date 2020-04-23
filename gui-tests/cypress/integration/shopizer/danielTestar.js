

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

    it.only('can\'t create account when already exists', () => {

        // go to registration
        cy.contains('My Account').click();
        cy.get('#registerLink').click();

        // enter data in form
        cy.get('[name = "billing.firstName"]').type('John');
        cy.get('[name = "billing.lastName"]').type('Doe');
        cy.get('#registration_country').select('Sweden');
        cy.get('[name = "billing.stateProvince"]').type('Teststaden');
        cy.get('[name = "emailAddress"]').type('test@gmail.com'); 
        cy.get('[name = "password"]').type('password1');
        cy.get('#passwordAgain').type('password1');

        // click submit button
        cy.get('[type="submit"]').click();

        // assert error message is displayed
        cy.get('div.alert').should('contain', 'already exists');

   })


})
