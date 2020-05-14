describe("Test shopizer", function () {

    const url = "http://localhost:8080/admin/";

    this.beforeEach('open shopizer', function () {
        cy.visit(url);
    });

    it('US 10 Se butikens kunder', () => {

        cy.visit("http://localhost:8080/admin/logon.html");
        cy.url().should('include', '/admin')
        cy.get('#username').type('admin@shopizer.com ');
        cy.get('#password').type('password');

        cy.get('#formSubmitButton').click();
        cy.url().should('include', '/home')

        cy.contains('Customers').click({ force: true });
        cy.url().should('include', 'customers/list')
        cy.get('h3').should('contain', 'Customer list');

    });

    it('US 5 Admin kan se lagda ordrar', () => {

        //Gå till shop och genomför ett köp 
        cy.visit("http://localhost:8080/shop/");
        cy.contains('Handbags').click({ force: true });
        cy.get('.addToCart[productid = "2"]').first().click();
        //assert att varukorgen fick en etta   
        cy.get('#miniCartSummary').should($el => expect($el.text().trim()).to.equal('1'));
        cy.contains('Checkout').click({ force: true });
        cy.contains('Proceed to checkout').click();
        cy.get('[name = "customer.billing.firstName"]').type('Testan');
        cy.get('[name = "customer.billing.lastName"]').type('Testsson');
        cy.get('[name = "customer.billing.address"]').type('Testvägen 5');
        cy.get('[name = "customer.billing.city"]').type('Teststaden');
        cy.get('[name = "customer.billing.postalCode"]').type('12345');
        cy.get('[name = "customer.emailAddress"]').type('testan@testsson.se');
        cy.get('[name = "customer.billing.phone"]').type('0701234567');
        cy.get('#submitOrder').click();

        //Spara order id, logga in admin och kontrollera att det finns med. 
        cy.contains('Your order id is').invoke('text').then(($txt) => {
            const orderID = $txt.replace(/\D/g, ''); //Ta bort allt utom siffror och spara till orderID

            //logga in som admin
            cy.visit(url);
            cy.get('#username').type('admin@shopizer.com');
            cy.get('#password').type('password');
            cy.get('#formSubmitButton').click();

            //Assert att sidan innehåller texten "Recent orders"
            cy.get('body').should('contain', 'Recent orders');

            //Assert att sparat orderID finns högst upp i id-kolumnen i tabellen med ordrar
            cy.get('#isc_Vtable tr:nth-child(1) td:nth-child(1)').should('contain', orderID);
        });

    });

    it('US 9 Admin login', () => {

        //logga in som admin
        cy.visit(url);
        cy.get('#username').type('admin@shopizer.com');
        cy.get('#password').type('password');
        cy.get('#formSubmitButton').click();

        //Assert att url är rätt
        cy.url().should('include', 'admin/home');
    })
});
