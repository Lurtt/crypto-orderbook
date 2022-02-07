import { When } from 'cypress-cucumber-preprocessor/steps';

When('I switch to new tab', () => {
  cy.document().then((doc) => {
    cy.stub(doc, "visibilityState").value("hidden");
  });

  cy.document().trigger('visibilitychange');
});
