describe("Test the header", () => {
  it("displays Video Store", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("contain.text", "Video Store");
  });
});
