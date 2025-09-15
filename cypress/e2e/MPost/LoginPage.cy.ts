describe("MPost Login Page", () => {
    beforeEach(() => {
        // Step-1: Navigate to http://staging.mpost.global/ url
        cy.visit("https://staging.mpost.global/auth/login");
        // Assert url redirection
        cy.url().should("eq", "https://staging.mpost.global/auth/login");
        // Accept cookies if the popup appears
        cy.get("#rcc-decline-button").click();
        cy.wait(2000);
    });

    it("Navigate to Login Page", () => {
        // Click on the Login button
        cy.get("div[class='flex items-center'] > a[href='/auth/login']").click();
        // Assert on the redirection to the login page
        cy.url().should("eq", "https://staging.mpost.global/auth/login");
        cy.wait(2000);
    });
});
