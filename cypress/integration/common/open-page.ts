import { When } from "cypress-cucumber-preprocessor/steps";

When('I open {string} page', (url) => {
  cy.visit(url);
});
