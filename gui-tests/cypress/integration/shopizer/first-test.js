

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

        //

    });


})