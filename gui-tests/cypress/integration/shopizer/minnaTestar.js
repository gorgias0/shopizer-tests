



describe("Test shopizer", function () {

    this.beforeAll('open shopizer', function () {
        adminLogin();
        const data = cy.readFile('testDataShopizer.json');
    });

    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/shop/"
        cy.visit(url);
    });




        it('makes purchase without creating account', () => {
            let firstName = data[1].firstName;
            console.log(firstName);
            cy.get('#featuredItemsContainer > div:nth-child(1) > div.product-content.text-center > div > div > a').click(); //Ändra selektor
            //lägg till assert att varukorg visar 1
            cy.get('#miniCartDetails > li.checkout-bg > a').click({ force: true });
            //lägg till assert på rätt produkt, price och total
            cy.contains('Proceed to checkout').click();
            cy.get('[name = "customer.billing.firstName"]').type(firstName);
            cy.get('[name = "customer.billing.lastName"]').type('Testsson');
            cy.get('[name = "customer.billing.address"]').type('Testvägen 5');
            cy.get('[name = "customer.billing.city"]').type('Teststaden');
            cy.get('[name = "customer.billing.postalCode"]').type('12345');
            cy.get('[name = "customer.emailAddress"]').type('testan@testsson.se');
            cy.get('[name = "customer.billing.phone"]').type('0701234567');
            cy.get('#submitOrder').click();
        })

        xit('creates account', () => {
            cy.contains('My Account').click();
            cy.get('#registerLink').click();
            cy.get('[name = "billing.firstName"]').type('Testan');
            cy.get('[name = "billing.lastName"]').type('Testsson');
            cy.get('[name = "billing.stateProvince"]').type('Teststaden');
            cy.get('[name = "emailAddress"]').type('testan@testsson.se');
            cy.get('[name = "password"]').type('password1');
            cy.get('#passwordAgain').type('password1');


        })

    })

    function adminLogin() {
        cy.visit('http://localhost:8080/admin');
        cy.get('#username').type('admin');
        cy.get('#password').type('password');
        cy.get('#formSubmitButton').click();
    }