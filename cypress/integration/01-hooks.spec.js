describe('Hooks', () => {
  before(() => {
    cy.log('I run once before all tests in this describe');
    cy.visit('/');
  });

  after(function () {
    cy.log('I run once after all tests in this describe');
  });

  beforeEach(function () {
    cy.log('I run before each test in this describe');
  });

  afterEach(function () {
    cy.log('I run after each test in this describe');
  });

  context('Grouping of tests', () => {
    it('A test case', () => {
      expect('A string').to.equal('A string');
    });

    it('Another test case', () => {
      expect(5 * 2).to.equal(10);
    });
  });
});
