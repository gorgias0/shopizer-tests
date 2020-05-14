
describe("Test shopizer", function() {

    const time = (new Date()).getTime();
    const customerEmail = 'testan' + time + '@testsson.se';
    const customerPassword = 'password1';
    let firstName = 'Testan';

    this.beforeAll('open shopizer', function(){
        var url = "http://127.0.0.1:8080/shop/"
        cy.visit(url);
    });
    
it('creates account', () => {

    //Skapa konto
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
    //Assert att Kundnamn visas efter att kontot skapats
    cy.get('#customerAccount > a > span > span').should('have.text', firstName);

});

it('Spara varukorg vid inloggning', () => {

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
xit('Spara varukorg vid inloggning', () => {

    //Lägg produkt 1 i varukorg
   // cy.get('a[productid="1"]').click();
  // cy.get('[productid = "4"]').click();
    cy.contains('Handbags').first().click({force:true});
    cy.get('.addToCart[productid = "4"]').first().click();
    //assert att varukorgen fick en etta för hur många varor    
    cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1')); 
    cy.contains('Logout').click();
    cy.get('#customerAccount > a > span').should('not.have.text', firstName);
    cy.contains('Sign in').click({force:true});
    cy.get('#signin_userName').type(customerEmail);
    cy.get('#signin_password').type(customerPassword);
    cy.get('#genericLogin-button').click();
    cy.get('#customerAccount > a > span > span').should('have.text', firstName);
    cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1')); 

})
});