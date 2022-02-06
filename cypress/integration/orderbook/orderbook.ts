import { Then } from "cypress-cucumber-preprocessor/steps";

const TITLE = '[data-testid="title"]';
const INDICATOR_HEADLINE_BUYS = '[data-testid="indicator-headline-buys"]';
const INDICATOR_HEADLINE_SELLS = '[data-testid="indicator-headline-sells"]';

const getIndicator = (indicator: string) => `[data-testid="indicator-${indicator}"]`;

Then('I see the title', () => {
  cy.get(TITLE).should('have.text', 'Order Book');
});

Then('I see bids and asks columns', () => {
  cy.get(INDICATOR_HEADLINE_BUYS).should('be.visible');
  cy.get(INDICATOR_HEADLINE_SELLS).should('be.visible');
});

Then('I see only asks column', () => {
  cy.get(INDICATOR_HEADLINE_BUYS).should('not.be.visible');
  cy.get(INDICATOR_HEADLINE_SELLS).should('be.visible');
});

Then('I see {string} indicator direction goes to {string}', (indicator, direction) => {
  cy.get(getIndicator(indicator)).first().should('have.attr', 'style').and('contain', direction);
});
