it('Login user', () => {
  cy.visit('http://localhost:3000/login');

  cy.login('test@gmail.com', 'secret');
});
