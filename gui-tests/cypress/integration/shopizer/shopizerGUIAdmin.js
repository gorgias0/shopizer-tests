describe("Test shopizer", function () {

    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/admin/"
        cy.visit(url);
    });

    it('Se butikens kunder', () => {

        cy.visit("http://localhost:8080/admin/logon.html");
        cy.url().should('include', '/admin')
        cy.get('#username').type('admin@shopizer.com ');
        cy.get('#password').type('password');

        cy.get('#formSubmitButton').click();
        cy.url().should('include', '/home')

        cy.contains('Customers').click({force: true});
        cy.url().should('include', 'customers/list')
        cy.get('h3').should('contain', 'Customer list');

     })

})