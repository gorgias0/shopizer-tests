

describe("Test shopizer", function () {

    this.beforeAll('open shopizer', function () {
        adminLogin();
    });

    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/shop/"
        cy.visit(url);
    });




    it('Göra ett köp utan att logga in', () => {


        //Lägg produkt 7 i varukorg
        cy.get('[productid = "7"]').click();
        //assert att varukorgen fick en etta för hur många varor
        cy.get('#miniCartSummary > a > font > strong').should('have.text', '(1)');

        cy.get('#miniCartDetails > li.checkout-bg > a').click({ force: true });

        //Assertion att det är rätt url - att man kommer in i shoppingcart
        cy.url().should('include', '/shop/cart/shoppingCart.html')

        cy.get('body > div.entry-header-area.ptb-40 > div > div > div > div > h1').should('include.text', 'Review your order');

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


    it('creates account', () => {
        cy.contains('My Account').click();
        cy.get('#registerLink').click();
        cy.get('[name = "billing.firstName"]').type('Testan');
        cy.get('[name = "billing.lastName"]').type('Testsson');
        cy.get('[name = "billing.stateProvince"]').type('Teststaden');
        let date = new Date();
        cy.get('[name = "emailAddress"]').type('testan' + date.getTime() + '@testsson.se');
        cy.get('[name = "password"]').type('password1');
        cy.get('#passwordAgain').type('password1');
        cy.contains('Create an account').click();
        cy.url().should('include', '/shop/customer/dashboard.html');


    })
})



function adminLogin() {
    cy.visit('http://localhost:8080/admin');
    cy.get('#username').type('admin');
    cy.get('#password').type('password');
    cy.get('#formSubmitButton').click();
}
