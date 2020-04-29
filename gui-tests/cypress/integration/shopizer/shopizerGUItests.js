

describe("Test shopizer", function () {
    

    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/shop/"
        cy.visit(url);
    });




    it('Göra ett köp utan att logga in', () => {

        //Lägg produkt 7 i varukorg
        cy.get('[productid = "7"]').click();

        //assert att varukorgen fick en etta för hur många varor    
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1'));
    
        cy.contains('Checkout').click({ force: true });

        //Assertion att det är rätt url - att man kommer in i shoppingcart
        cy.url().should('include', '/shop/cart/shoppingCart.html')

        cy.get('h1').should('include.text', 'Review your order');

        cy.contains('Proceed to checkout').click();
        cy.get('[name = "customer.billing.firstName"]').type('Testan');
        cy.get('[name = "customer.billing.lastName"]').type('Testsson');
        cy.get('[name = "customer.billing.address"]').type('Testvägen 5');
        cy.get('[name = "customer.billing.city"]').type('Teststaden');
        cy.get('[name = "customer.billing.postalCode"]').type('12345');
        cy.get('[name = "customer.emailAddress"]').type('testan@testsson.se');
        cy.get('[name = "customer.billing.phone"]').type('0701234567');
        cy.get('#submitOrder').click();

        //Assertion på rätt url
        cy.url().should('include', '/shop/order/confirmation.html');


    })



    it("Test shoppingcart", function() {
        cy.get('a[productid="4"]').click();

        // one item in cart
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1'));

        // two items in cart
        cy.get('a[productid="8"]').click();
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('2'));

        // three items in cart
        cy.get('a[productid="8"]').click();
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('3'));

        // remove onei
        cy.get('.close-icon > button[productid="4"]').click({force:true});
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('2'));

        // remove last two
        cy.get('.close-icon > button[productid="8"]').click({force:true});
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('0'));

    });

    it('creates account', () => {
        cy.contains('My Account').click();
        cy.get('#registerLink').click();
        let firstName = 'Testan'
        cy.get('[name = "billing.firstName"]').type(firstName);
        cy.get('[name = "billing.lastName"]').type('Testsson');
        cy.get('[name = "billing.stateProvince"]').type('Teststaden');
        const time = (new Date()).getTime();
        cy.get('[name = "emailAddress"]').type('testan' + time + '@testsson.se');
        cy.get('[name = "password"]').type('password1');
        cy.get('#passwordAgain').type('password1');
        cy.contains('Create an account').click();
        cy.url().should('include', '/shop/customer/dashboard.html');

        cy.get('#customerAccount > a > span > span').should('have.text', firstName);


    })

    it('Can\'t create account when already exists', () => {

        // go to registration
        cy.contains('My Account').click();
        cy.get('#registerLink').click();

        // enter data in form
        cy.get('[name = "billing.firstName"]').type('John');
        cy.get('[name = "billing.lastName"]').type('Doe');
        cy.get('#registration_country').select('Canada');
        cy.get('[name = "billing.zone"]').select('Ontario');
        cy.get('[name = "emailAddress"]').type('test@gmail.com'); 
        cy.get('[name = "password"]').type('password1');
        cy.get('#passwordAgain').type('password1');

        // click submit button
        cy.contains('Create an account').click();

        // assert error message is displayed
        cy.get('div.alert').should('contain', 'already exists');

   })

   it('Admin login', () => {
    cy.visit('http://localhost:8080/admin');
    cy.get('#username').type('admin@shopizer.com');
    cy.get('#password').type('password');
    cy.get('#formSubmitButton').click();

    //Assert sidan innehåller Recent orders
    cy.get('body').should('contain', 'Recent orders');
    

   })
})


    

