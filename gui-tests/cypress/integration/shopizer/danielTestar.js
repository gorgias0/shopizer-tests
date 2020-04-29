

describe("Test shopizer", function() {
    this.beforeAll('open shopizer', function(){
        var url = "http://127.0.0.1:8080/shop/"
        cy.visit(url);
    });

     it.only("Test shoppingcart", function() {
        cy.get("a").contains("Bags").click();
        cy.get('a[productid="1"]').first().click();

        // one item in cart
        cy.get('#miniCartSummary').should('contain', '1');

        // two items in cart
        cy.get('a[productid="2"]').first().click();
        cy.get('#miniCartSummary').should('contain', '2');

        // three items in cart
        cy.get('a[productid="3"]').first().click();
        cy.get('#miniCartSummary').should('contain', '3');

        // remove one
        cy.get('.cart-del > button').first().click({force:true});
        cy.get('#miniCartSummary').should('contain', '2');

        // remove two
        cy.get('.cart-del > button').first().click({force:true});
        cy.get('#miniCartSummary').should('contain', '1');

        // remove three
        cy.get('.cart-del > button').first().click({force:true});
        cy.get('#miniCartSummary').should('contain', '0');

        //var a = cy.get('.cart-del > button');
        //expect(a).to.be.null;

    });

    it('Can\'t create account when already exists', () => {

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
