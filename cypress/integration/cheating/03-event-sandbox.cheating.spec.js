describe('Event Sandbox', () => {
  before(() => {
    cy.visit('/');
  });

  context('on first load', () => {
    it('renders the input', () => {
      cy.getTestId('es-input')
        .should('have.value', '')
        .and('have.placeholder', 'Interact here');
    });

    it('renders an empty log section', () => {
      cy.getTestId('es-logs').should('be.empty');
    });
  });

  context('input events triggers log messages', () => {
    // sets clock to 1st January 2020 at 23:59:59
    beforeEach(() => cy.clock(1577923199000));

    it('logs focus event', () => {
      cy.getTestId('es-input').focus();

      cy.getTestId('es-log')
        .eq(0)
        .should('have.text', '23:59:59 - Input focused');
    });

    it('creates logs for keyup event with codes', () => {
      cy.getTestId('es-input').focus().type('a').type('2').type('{enter}');

      cy.getTestId('es-log')
        .eq(0)
        .should('have.text', '23:59:59 - Keyup code: 13')

        .getTestId('es-log')
        .eq(1)
        .should('have.text', '23:59:59 - Keyup code: 50')

        .getTestId('es-log')
        .eq(2)
        .should('have.text', '23:59:59 - Keyup code: 65');
    });

    it('logs blur event', () => {
      cy.getTestId('es-input').blur();

      cy.getTestId('es-log')
        .eq(0)
        .should('have.text', '23:59:59 - Input blurred');
    });
  });

  context('style of log messages', () => {
    // sets clock to 1st January 2020 at 23:59:59
    beforeEach(() => cy.clock(1577923199000));

    it('should pad the time numbers correctly', () => {
      cy.triggerLogs(1);

      cy.getTestId('es-log').eq(0).should('contain', '23:59:59');

      cy.tick(1000).triggerLogs(1);

      cy.getTestId('es-log').eq(0).should('contain', '00:00:00');
    });

    it('should only bold the newest log message', () => {
      // let's use a loop!
      cy.triggerLogs(5);

      cy.getTestId('es-log').each(($el, $index) => {
        if ($index === 0) {
          expect($el).to.have.css('font-weight', '700');
        } else {
          expect($el).not.to.have.css('font-weight', '700');
        }
      });
    });

    it('should only show a maximum of 5 log messages', () => {
      cy.triggerLogs(10).getTestId('es-logs').children().should('be.length', 5);
    });
  });
});
