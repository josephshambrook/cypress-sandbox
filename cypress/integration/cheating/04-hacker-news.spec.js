import { TOP_STORIES } from '../../src/urls';

describe('Hacker News', () => {
  context('API requests slow', () => {
    before(() => {
      cy.server({
        delay: 1000,
      });
      cy.route(TOP_STORIES, 'fixture:topstories.json').as('topstories');
      cy.route('**/item/22008566*', 'fixture:item.json').as('item');
      cy.visit('/');
    });

    it('should display the loading title, then replace it with the card', () => {
      cy.getTestId('hn-loading').should('be.visible');
      cy.getTestId('hn-card').should('not.be.visible');

      cy.wait('@item');
      cy.getTestId('hn-loading').should('not.be.visible');
      cy.getTestId('hn-card').should('be.visible');
    });
  });

  context('API calls return errors', () => {
    it('should display nothing when the topstories URL fails', () => {
      cy.server();
      cy.route({
        url: TOP_STORIES,
        status: 404,
        response: [],
      });
      cy.reload();
      cy.getTestId('hn-loading').should('not.be.visible');
      cy.getTestId('hn-card').should('not.be.visible');
    });

    it('should display nothing when the topstories URL fails', () => {
      cy.server();
      cy.route({
        url: '**/item/**',
        status: 404,
        response: {},
      });
      cy.reload();
      cy.getTestId('hn-loading').should('not.be.visible');
      cy.getTestId('hn-card').should('not.be.visible');
    });
  });

  context('Card content when API call is successful', () => {
    beforeEach(() => {
      cy.server();
      cy.route(TOP_STORIES, 'fixture:topstories.json').as('topstories');
      cy.route('**/item/22008566*', 'fixture:item.json').as('item');
      cy.visit('/');
      cy.wait('@topstories');
    });

    it('displays the item title, author and score', () => {
      cy.getTestId('hn-card').should(($el) => {
        expect($el).to.contain('An interesting title');
        expect($el).to.contain('150 points');
        expect($el).to.contain('by A cool author');
      });
    });

    it('displays a link to the post, which opens in a new tab', () => {
      cy.getTestId('hn-card-link').should(
        'have.attr',
        'href',
        'https://news.ycombinator.com/'
      );
    });
  });
});
