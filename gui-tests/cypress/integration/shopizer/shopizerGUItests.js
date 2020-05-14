

describe("Test shopizer", function () {
    
    const time = (new Date()).getTime();
    const customerEmail = 'testan' + time + '@testsson.se';
    const customerPassword = 'password1';
    const firstName = 'Testan';


    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/shop/"
        cy.visit(url);
    });

    it('US 6 Se produkter', () => {

        //ASSERT PÅ STARTSIDAN
        cy.url().should('include', '/shop/');
        cy.get('body').should('contain', 'Featured items');

        //HANDBAGS
        cy.contains('Handbags').click({ force: true });
        cy.url().should('include', '/shop/category/handbags');
        cy.get('h2').should('contain', 'Handbags');
        //SPECIFIK HANDBAG
        cy.get('body').should('contain', 'Vintage courier bag');

        //LAPTOP BAGS
        cy.contains('Laptop Bags').click({ force: true });
        cy.url().should('include', '/shop/category/laptop-bags');
        cy.get('h2').should('contain', 'Laptop Bags');
        //SPECIFIK HANDBAG
        cy.get('body').should('contain', 'Vintage laptop bag');

        //BEACH BAGS
        cy.contains('Beach bags').click({ force: true });
        cy.url().should('include', '/shop/category/beach-bags');
        cy.get('h2').should('contain', 'Beach bags');
        //SPECIFIK HANDBAG
        cy.get('body').should('contain', 'Vintage beach bag');
        
    })


    it('US 1 4 Göra ett köp utan att logga in', () => {

        cy.contains('Handbags').click({ force: true });

        //Lägg produkt 2 i varukorg
        cy.get('[productid = "2"]').first().click();

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
        const email = 'testan@testsson.se'
        cy.get('[name = "customer.emailAddress"]').type(email);
        cy.get('[name = "customer.billing.phone"]').type('0701234567');
        cy.get('#submitOrder').click();

        //Assertion på rätt url
        cy.url().should('include', '/shop/order/confirmation.html');
        
        //Assertion info om att mail har skickats till rätt emailadress    
        cy.get('#main-content').should('contain', 'An email with your order details has been sent to ' + email);

       });




    it("US 2 Test shoppingcart", function() {
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

    it('US 7 creates account', () => {
        cy.contains('My Account').click();
        cy.get('#registerLink').click();
        cy.get('[name = "billing.firstName"]').type(firstName);
        cy.get('[name = "billing.lastName"]').type('Testsson');
        cy.get('[name = "billing.stateProvince"]').type('Teststaden');
        cy.get('[name = "emailAddress"]').type(customerEmail);
        cy.get('[name = "password"]').type(customerPassword);
        cy.get('#passwordAgain').type(customerPassword);
        cy.contains('Create an account').click();
        cy.url().should('include', '/shop/customer/dashboard.html');

        cy.get('#customerAccount > a > span > span').should('have.text', firstName);


    })

    it('US 8 Spara varukorg vid inloggning', () => {

        //Lägg produkt 1 i varukorg
        cy.contains('Handbags').first().click({force:true});
        cy.get('.addToCart[productid = "4"]').first().click();
        //Assert att varukorgen fick en 1a för antal varor    
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1')); 
        //Kund loggas ut
        cy.contains('Logout').click();
        //Assert att kundnamn inte visas efter utloggning
        cy.get('#customerAccount > a > span').should('not.have.text', firstName);
        //Logga in kund
        cy.contains('Sign in').click({force:true});
        cy.get('#signin_userName').type(customerEmail);
        cy.get('#signin_password').type(customerPassword);
        cy.get('#genericLogin-button').click();
        //Assert kundnamn visa 
        cy.get('#customerAccount > a > span > span').should('have.text', firstName);
        //Assert att varukorgen fortfarande innehåller en 1a för antal varor
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1')); 
    
    })
    it('US 3 Privata kunduppgifter', () => {

        cy.url().should('include', '/shop');
        cy.contains('Sign in').click({ force: true });
        cy.url().should('include', 'customLogon');
        cy.get('#signin_userName').type(customerEmail);
        cy.get('#signin_password').type('12346');
        cy.get('#genericLogin-button').click({force: true});
        cy.get('body').should('contain', 'Login Failed. Username or Password is incorrect.');

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
        cy.get('[name = "password"]').type('Password1');
        cy.get('#passwordAgain').type('Password1');

        // click submit button
        cy.contains('Create an account').click();

        // assert error message is displayed
        cy.get('div.alert').should('contain', 'already exists');

   })

   
})


    

