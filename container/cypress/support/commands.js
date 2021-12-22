Cypress.Commands.add('login', (email, password) => {
  // Get username
  cy.get('input[name="username"]').type(email);

  // Get password
  cy.get('input[name="password"]').type(password);

  // Click the button
  cy.get('button[data-cypress-id="login"').click();
});
