import { When, Then } from 'cypress-cucumber-preprocessor/steps';

const TITLE = '[data-testid="title"]';
const INDICATOR_HEADLINE_BUYS = '[data-testid="indicator-headline-buys"]';
const INDICATOR_HEADLINE_SELLS = '[data-testid="indicator-headline-sells"]';
const TOAST = '[data-testid="toast"]';
const TOAST_BUTTON_RECONNECT = '[data-testid="toast-button-reconnect"]';
const TOGGLE_MARKET = '[data-testid="toggle-market"]';

const getIndicator = (indicator: string) => `[data-testid="indicator-${indicator}"]`;

When('I change the market', () => {
  cy.get(TOGGLE_MARKET).click();
});

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

Then('I see the reconnect notification', () => {
  cy.get(TOAST).should('be.visible');
});

Then('I press recconect button', () => {
  cy.get(TOAST_BUTTON_RECONNECT).click();
});

Then('I do not see the notification', () => {
  cy.get(TOAST).should('not.exist');
});
