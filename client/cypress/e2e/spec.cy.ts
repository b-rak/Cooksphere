describe('cypress cooksphere', () => {
  it('renders the default elements on the screen', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="cypress-title"]').should('exist')
      .should('have.text', 'Cooksphere');
  });

  it('renders the categories  on the screen', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="listItem-1737462017379"]').should('exist');

  });
});