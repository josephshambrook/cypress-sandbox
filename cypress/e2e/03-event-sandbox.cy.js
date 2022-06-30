describe('Event Sandbox', () => {
  before(() => {
    cy.visit('/');
  });

  context('on first load', () => {
    it('renders the input', () => {});

    it('renders an empty log section', () => {});
  });

  context('input events triggers log messages', () => {
    // sets clock to 1st January 2020 at 23:59:59
    beforeEach(() => cy.clock(1577923199000));

    it('logs focus event', () => {});

    it('creates logs for keyup event with codes', () => {});

    it('logs blur event', () => {});
  });

  context('style of log messages', () => {
    // sets clock to 1st January 2020 at 23:59:59
    beforeEach(() => cy.clock(1577923199000));

    it('should pad the time numbers correctly', () => {});

    it('should only bold the newest log message', () => {});

    it('should only show a maximum of 5 log messages', () => {});
  });
});
