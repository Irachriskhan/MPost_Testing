describe('MPost Our Solution Page Tests', () => {
    const baseUrl = 'https://staging.mpost.global/our-solution';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.url().should("eq", baseUrl);
        // Accept cookies if the popup appears
        cy.get("#rcc-decline-button").click();
        cy.wait(2000);
    });

    it("should load page and display main elements", () => {
        // Assert page title
        cy.title().should("include", "MPost - Say Goodbye to Unverifiable Addresses and Frustrating Deliveries");
        cy.get("meta[name='description']").should("have.attr", "content", "Whether you're an individual, a business, or a government agency, MPost helps you connect, deliver, and grow, anywhere, anytime.");

        // Assert page heading
        cy.contains("h1", "OUR SOLUTIONS").should("be.visible");

        // Assert page description
        cy.contains(
            "Say Goodbye to Unverifiable Addresses and Frustrating Deliveries"
        ).should("be.visible");

        // Assert presence of buttons
        cy.contains("button", "Get Your Digital Address").should("be.visible");
        cy.contains("button", "Partner With Us").should("be.visible");
    });



    it("should scroll to 'Solutions' and validate each left navigation item", () => {
        // Scroll to Solutions heading
        cy.contains("h3", "Solutions").scrollIntoView().should("be.visible");

        // Navigation list assertions
        const navItems = [
            "Individuals & Small Businesses",
            "Postal Authorities",
            "Financial Institutions",
            "E-commerce & Logistics",
            "Coming Soon",
            "Why MPost?",
        ];

        navItems.forEach((item) => {
            cy.contains("li", item).should("be.visible").click();
            // cy.contains("h2, h3", item.split(" ")[0]).should("be.visible"); 
        });
    });

    it("should display the 'Join thousands...' section and buttons", () => {
        // Navigate to the section
        cy.contains(
            "Join thousands already using MPost to simplify their lives, grow their businesses, and expand their reach."
        )
            .scrollIntoView()
            .should("be.visible");

        // Assert buttons
        cy.contains("button", "Get Your Digital Address").should("be.visible");
        cy.contains("button", "Partner With Us").should("be.visible");
    });
});
