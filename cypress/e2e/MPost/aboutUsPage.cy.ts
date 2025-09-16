describe('MPost About Us Page - Test Case 1', () => {
    const baseUrl = 'https://staging.mpost.global/about-us';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.url().should("eq", baseUrl);
        // Accept cookies if the popup appears
        cy.get("#rcc-decline-button").click();
        cy.wait(2000);
    });

    it('should assert the page title', () => {
        // assert the page title
        cy.title().should('eq', 'MPost - Exchange Anything. Anytime. Anywhere.');
        // assert the meta description content
        cy.get('head meta[name="description"]').should(
            'have.attr',
            'content',
            'MPost - Join millions of individuals and businesses using MPOST as their universal digital address—enabling secure mail and parcel delivery, hassle-free returns for online shoppers, and seamless identity verification for both local and global transactions.'
        );
        // assert "ABOUT US" heading visibility
        cy.contains('h1', 'ABOUT US').should('be.visible');
        // assert the mission description visibility
        cy.contains(
            'Learn more about MPost and our mission to provide universal digital addresses.'
        ).should('be.visible');
    });

    it('should should navigate the whole page', () => {
        // Scroll to Company Profile visibility
        cy.contains('h2', 'COMPANY PROFILE').scrollIntoView().should('be.visible');
        // assert vision and mission visibility
        cy.contains('h2', 'Vision').scrollIntoView().should('be.visible');
        cy.contains('h2', 'Mission').scrollIntoView().should('be.visible');
        // assert core values visibility
        cy.contains(
            'h2',
            'Enabling E-commerce, KYC Address Verification, and Seamless Delivery'
        )
            .scrollIntoView()
            .should('be.visible');
        // assert "Our Solutions and Policies" section visibility
        cy.contains('h2', 'Our Solutions and Policies').scrollIntoView().should('be.visible');

        // Assert presence of button and links
        cy.contains('button', 'View Solutions').should('be.visible');
        cy.contains('a', 'User Terms and Conditions').should('be.visible');
        cy.contains('a', 'Our Privacy Policy').should('be.visible');
    });
});
