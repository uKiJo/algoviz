describe("first", () => {
  it("should first", () => {
    cy.visit("http://localhost:3000");
    cy.get("p").eq(0).contains(/get/i);
  });
});
