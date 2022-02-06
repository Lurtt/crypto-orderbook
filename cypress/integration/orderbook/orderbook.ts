import { Then } from "cypress-cucumber-preprocessor/steps";

const TITLE = '[data-testid="title"]';
const INDICATOR_HEADLINE_BIDS = '[data-testid="indicator-headline-bids"]';
const INDICATOR_HEADLINE_ASKS = '[data-testid="indicator-headline-asks"]';

Then('I see the title', () => {
  cy.get(TITLE).should('have.text', 'Order Book');
});

Then('I see bids and asks columns', () => {
  cy.get(INDICATOR_HEADLINE_BIDS).should('be.visible');
  cy.get(INDICATOR_HEADLINE_ASKS).should('be.visible');
});
