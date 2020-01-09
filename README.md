# Cypress Sandbox

This is a small React app I've made, to serve as a sandbox to test various functionalities of [Cypress](https://www.cypress.io/).

Specifically, the app contains:

- Two API calls to the Hacker News API; one to get a list of the current top stories, and then another to get details on the first story retrieved from the previous API call.
- An event sandbox, containing an `<input />` with some event listeners added. When the input detects certain events (`onFocus`, `onBlur` and `onKeyUp`), it adds a log to messages in the section next to it.

These functionalities make it possible to test the following in Cypress:

- Assertions
- Browser events
- External links
- Fixtures
- Commands
- Plugins

## Installation

1. Clone the repo locally
2. Run `npm i` to install the dependencies

## Running Cypress

- Run `npm start` to start the app at `localhost:3000`.
- In a separate Terminal instance, run `npm run cy:open` to open Cypress' UI.
  - Alternatively, `npm run cy:run` will run all Cypress tests in one go, with recordings and screenshots

> Note: I recommend using iTerm to run separate Terminal instances in split-screen.
