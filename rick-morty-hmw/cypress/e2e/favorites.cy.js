describe('Favorites Functionality', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:5173'); // Visit the homepage before each test
    });
    
    it('Should load the home page successfully', () => {
      // Ensure the title is on the page and visible
      cy.contains('Rick & Morty App').should('be.visible');
    });
    
    it('Should navigate to the Favorites page', () => {
      // Click on the Favorites link and verify navigation
      cy.contains('Favorites').click();
      cy.url().should('include', '/favorites'); // Verify URL includes '/favorites'
      cy.contains('Your Favorite Characters').should('be.visible'); // Verify that the Favorites page loaded
    });
  
  });
  