describe('My First Test', function () {

    this.beforeEach('open shopizer', function () {
        const url = "http://localhost:8080/shop/"
        cy.visit(url);
    });

    it('Se produkter', () => {

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

    // it('Göra ett köp utan att logga in', () => {
        
    //     //BESÖKA ADMIN FÖR ATT LOGGA IN - Kanske ej lämpligt för "göra ett test utan att logga in".
    //     cy.visit('http://localhost:8080/admin');
    //     cy.get('#username').type('admin');
    //     cy.get('[id = password]').type('password');
    //     cy.get('[id = formSubmitButton]').click();

    //     //Gå till Shoppen
    //     cy.visit('http://localhost:8080/shop'); 
    //     // ELLER -> let url ='URLEN LOCALHOST'

    //     //Lägg produkt 7 i varukorg
    //     cy.get('[productid = "7"]').click(); 
    //     //assert att varukorgen fick en etta för hur många varor
    //     cy.get('#miniCartSummary > a > font > strong').should('have.text', '(1)'); 
    //     //cy.get('#miniCartSummary > a > font > strong').should('include.text', '1'); -> om man vill ha 1 istället för (1)

    //     //cy.contains('Checkout').click({force:true}); -> denna address funkade inte, nedan funkade
    //     cy.get('#miniCartDetails > li.checkout-bg > a').click({force:true});

    //     //Assertion att det är rätt url - att man kommer in i shoppingcart
    //     cy.url().should('include', '/shop/cart/shoppingCart.html')
    //     //cy.get('body > div.entry-header-area.ptb-40 > div > div > div > div > h1').should('include.text', 'Review your order');
    //     //cy.get('div.wc-proceed-to-checkout > a').click();
    //     cy.contains('Proceed to checkout').click();

        
    //     //cy.get('selector').type('skriva');
    // })

    
  })