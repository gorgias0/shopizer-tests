

describe("Test shopizer", function() {
    this.beforeAll('open shopizer', function(){
        var url = "http://127.0.0.1:8080/shop/"
        cy.visit(url);
    });

    it("First test", function() {
        //cy.get("li").find("nth-child(2) > a").click();
        //cy.get("li:nth-child(2) > a").click();
        cy.get("a").contains("Find owners").click();
        cy.get("#lastName").type("Est");
        cy.get('[type="submit"]').click();
        cy.contains("Carlos Estaban");
        cy.contains("Waunakee");
    });


})