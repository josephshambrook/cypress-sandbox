import { TOP_STORIES } from '../../../src/urls';

describe('Hacker News', () => {
  context('API calls return errors', () => {
    it('should display nothing when the topstories URL fails', () => {
      cy.intercept(TOP_STORIES, {
        statusCode: 404,
        body: [],
      });
      cy.visit('/');

      cy.getTestId('hn-loading').should('not.exist');
      cy.getTestId('hn-card').should('not.exist');
    });

    it('should display nothing when the topstories URL fails', () => {
      cy.intercept('**/item/**', {
        statusCode: 404,
        body: {},
      });
      cy.visit('/');

      cy.getTestId('hn-loading').should('not.exist');
      cy.getTestId('hn-card').should('not.exist');
    });
  });

  context('Card content when API call is successful', () => {
    beforeEach(() => {
      cy.intercept(TOP_STORIES, { fixture: 'topstories.json' }).as(
        'topstories'
      );
      cy.intercept('**/item/22008566*', { fixture: 'item.json' }).as('item');

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

  context('API requests slow', () => {
    before(() => {
      cy.intercept(TOP_STORIES, { fixture: 'topstories.json', delay: 2000 }).as(
        'topstories'
      );
      cy.intercept('**/item/22008566*', {
        fixture: 'item.json',
        delay: 2000,
      }).as('item');
      cy.visit('/');
    });

    it('should display the loading title, then replace it with the card', () => {
      cy.getTestId('hn-loading').should('be.visible');
      cy.getTestId('hn-card').should('not.exist');

      cy.wait('@item');
      cy.getTestId('hn-loading').should('not.exist');
      cy.getTestId('hn-card').should('be.visible');
    });
  });
});
