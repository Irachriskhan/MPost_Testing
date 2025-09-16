describe('MPost Partner With Us Page Tests', () => {
    const baseUrl = 'https://staging.mpost.global/partners';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.url().should("eq", baseUrl);
        // Accept cookies if the popup appears
        cy.get("#rcc-decline-button").click();
        cy.wait(2000);
    });

    it("should load page and display main elements", () => {
        // Assert page title
        cy.title().should("eq", "MPost - Exchange Anything. Anytime. Anywhere.");
        cy.get("meta[name='description']").should("have.attr", "content", "MPost - Join millions of individuals and businesses using MPOST as their universal digital address—enabling secure mail and parcel delivery, hassle-free returns for online shoppers, and seamless identity verification for both local and global transactions.");

        // Assert page heading
        cy.contains("h1", "PARTNER WITH US").should("be.visible");

        // Assert page description
        cy.contains(
            "Join us in building Africa's digital addressing infrastructure and unlock new opportunities for growth."
        ).should("be.visible");

        // Assert presence of buttons
        cy.contains("Why Partner with MPost?").should("be.visible").scrollIntoView();
        cy.contains("Our Partnership Models").should("be.visible");
        cy.contains("Let's Work Together").should("be.visible").scrollIntoView();
    });

    it("should validate input fields of the partners form", () => {
        cy.contains("Partnership Inquiry")
            .scrollIntoView()
            .should("be.visible");

        // cy.contains("button", "Submit").click();
        cy.get("input#name").should("be.visible").and("have.attr", "placeholder", "Enter your full name");
        cy.get("input#email").should("be.visible").and("have.attr", "placeholder", "Enter your email address");
        cy.get("input#company").should("be.visible").and("have.attr", "placeholder", "Enter your company name");
        cy.get("input#role").should("be.visible").and("have.attr", "placeholder", "Enter your role or title");

        // Dropdown (Partnership Field)
        cy.get("#partnershipField").should("exist"); // input inside Ant Design select
        cy.contains("span", "Select partnership field").should("be.visible");

        // Monthly Users field
        cy.get("input#monthlyUsers")
            .should("be.visible")
            .and("have.attr", "placeholder", "e.g., 10,000 or 50K-100K");

        // Message textarea
        cy.get("textarea#message")
            .should("be.visible")
            .and("have.attr", "placeholder")
            .and("include", "Tell us about your partnership interest");

        // Submit button
        cy.contains("button span", "Send Partnership Inquiry")
            .should("be.visible")
            .and("not.be.disabled");
    });

    it("should display error message when submiting an empty partners form", () => {
        cy.contains("Partnership Inquiry")
            .scrollIntoView()
            .should("be.visible");
        cy.contains("button span", "Send Partnership Inquiry").click();
        // Assert that each required field displays the "Required" message
        const requiredFields = [
            "#name",
            "#email",
            "#company",
            "#role",
            // "#partnershipField",
            "#monthlyUsers",
            "#message"
        ];

        requiredFields.forEach((selector) => {
            cy.get(selector)
                .siblings("div[class='text-red-500 text-sm']").contains("Required").should("be.visible");
            // .within(() => {
            //     cy.contains("Required").should("be.visible");
            // });
        });
    });

    it("should fill out and submit the partners form with valid data", () => {

        cy.contains("Partnership Inquiry")
            .scrollIntoView()
            .should("be.visible");

        // cy.contains("button", "Submit").click();
        cy.get("input#name").should("be.visible").and("have.attr", "placeholder", "Enter your full name").type("Khan Chris");
        cy.get("input#email").should("be.visible").and("have.attr", "placeholder", "Enter your email address").type("khan.chris@example.com");
        cy.get("input#company").should("be.visible").and("have.attr", "placeholder", "Enter your company name").type("Chris Company");
        cy.get("input#role").should("be.visible").and("have.attr", "placeholder", "Enter your role or title").type("Partnership Manager");

        // Select an option from the dropdown (Partnership Field)
        cy.get("#partnershipField").click({ force: true });
        // Select the option "Banks & Fintechs"
        cy.contains(".ant-select-dropdown .ant-select-item", "Banks & Fintechs")
            .click({ force: true });
        // Assert that the value is selected
        cy.get(".ant-select-selector").should("contain.text", "Banks & Fintechs");

        // Monthly Users field
        cy.get("input#monthlyUsers")
            .should("be.visible")
            .and("have.attr", "placeholder", "e.g., 10,000 or 50K-100K").type("50K-100K");

        // Message textarea
        cy.get("textarea#message").type("We are interested in partnering with MPost to enhance our delivery services.");

        // Submit button
        cy.contains("button span", "Send Partnership Inquiry")
            .should("be.visible")
            .and("not.be.disabled");
    });
});

