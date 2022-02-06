import { When } from "cypress-cucumber-preprocessor/steps";

When('I open app on mobile', () => {
  cy.viewport('iphone-6');
});


When('I open app on desktop', () => {
  cy.viewport('macbook-15');
});
