describe('Assertions', () => {
  before(() => {
    cy.visit('/');
  });

  context('Assertion styles', () => {
    it('checks the text using an implicit assertion - i.e. .should()', () => {
      // the arguments for .should() are from Chai-jQuery
      // https://www.chaijs.com/plugins/chai-jquery/
      cy.get('h1').should('have.text', 'Cypress Sandbox');

      // you can also chain implicit assertions using .and()
      cy.get('h1')
        .should('have.text', 'Cypress Sandbox')
        .and('be.visible')
        .and('not.be.hidden')
        .and('have.attr', 'data-testid', 'header-main');
    });

    it('checks the text using an explicit assertion - i.e. expect()', () => {
      // Note: expect() is a BDD assertion
      // https://docs.cypress.io/guides/references/assertions.html#BDD-Assertions
      expect('todos').to.equal('todos');

      // You can then chain Chai-jQuery methods onto expect()
      // https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery
      cy.get('h1').should(($el) => {
        expect($el).to.have.text('Cypress Sandbox');
        expect($el).to.be.visible;
        expect($el).not.to.be.hidden;
        expect($el).to.have.attr('data-testid', 'header-main');
      });

      // assert() is a TDD assertion
      // https://docs.cypress.io/guides/references/assertions.html#TDD-Assertions
      cy.get('h1').should(($el) => {
        assert.equal($el.text(), 'Cypress Sandbox');
      });
    });
  });

  context('Selecting elements', () => {
    it('uses the .get() method to get elements', () => {
      cy.get('h1').should('be.visible');
    });

    it('accepts any CSS selector available in Chrome', () => {
      cy.get('body h1').should('be.visible');
      cy.get('body #root').should('be.visible');
      cy.get('div[id="root"] h1').should('be.visible');
    });

    it('should however **target specific attributes added for testing**', () => {
      // see why here: https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
      cy.get('[data-testid="header-main"]').should('be.visible');
    });
  });
});
