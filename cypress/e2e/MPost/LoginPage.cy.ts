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

    it("Should load the Login Page successfully", () => {
        cy.contains("h2", "Login to your account").should("be.visible");
        // Click on the Login button
        cy.get("button[type='submit']").contains("Sign In").click();
        // Assert on the redirection to the login page
        cy.url().should("eq", "https://staging.mpost.global/auth/login");
        cy.wait(2000);
        // Assert on the presence of required fields
        cy.get("input[type='email']").should("be.visible");
        cy.get("input[id='password']").should("be.visible");
        cy.get("button[type='submit']").should("be.visible");
        cy.contains("Sign up").should("be.visible");
        cy.contains("Forgot password?").should("be.visible");
    });

    it("should validate empty field of the form", () => {
        //  Assert the presence of the text "Login to your account"
        cy.contains("h2", "Login to your account").should("be.visible");

        // Select the "Email" option and click on it
        cy.contains("button", "Email").should("be.visible").click();

        // Click "Sign In" without filling the form 
        cy.contains("button", "Sign In").click();
        // Assert validation messages for required fields
        cy.get("div.text-red-500.text-sm")
            .should("have.length.at.least", 1)
            .each(($el) => {
                cy.wrap($el).should("contain.text", "Required");
            });

        // Assert the presence of "Forgot password?" link
        cy.contains("a", "Forgot password?")
            .should("be.visible")
            .and("have.attr", "href", "/auth/forgot-password");
    });

    it("should show error message for invalid email", () => {
        // Type invalid email into email input
        cy.get("input[name='identifier']").type("Invalidemail");

        // Type some password 
        cy.get("input[name='password']").type("randomPassword");

        // Click Sign In
        cy.contains("button", "Sign In").click();

        // Assert error message appears
        cy.get("div.text-red-500.text-sm")
            .should("be.visible")
            .and(($el) => {
                const text = $el.text();
                expect(text).to.satisfy((t: string) =>
                    t.includes("Invalid email format") || t.includes("Required")
                );
            });
    });

    it("should allow phone number login and validate empty submission", () => {
        // 1. Click on Phone Number tab
        cy.contains("button", "Phone Number").click();

        // 2. Assert the presence of the phone number input field
        cy.get("input[name='identifier'][type='tel']")
            .should("exist")
            .and("be.visible")
            .and("have.attr", "placeholder", "Enter your phone number");
        cy.wait(4000);

        // 3. Assert the presence of the country code select
        cy.get("select[name='identifierCountry']")
            .should("exist");

        // 4. Click "Sign In" without filling phone number
        cy.contains("button span", "Sign In").click();

        // 5. Assert the error message "Required"
        cy.get("div.text-red-500.text-sm")
            .should("be.visible")
            .and("contain.text", "Required");
    });

    it("should display all Forgot Password elements correctly", () => {
        // Click on the "Forgot password?" link
        cy.contains("a", "Forgot password?")
            .should("be.visible")
            .and("have.attr", "href", "/auth/forgot-password").click();
        // Assert presence of the text "Forgot Password"
        cy.contains("Forgot Password").should("be.visible");

        // Assert presence of the buttons "Email" and "Phone Number"
        cy.contains("button", "Email").should("exist").and("be.visible");
        cy.contains("button", "Phone Number").should("exist").and("be.visible");

        // Assert presence of the email input field
        cy.get("input[name='identifier']")
            .should("exist")
            .and("be.visible")
            .and("have.attr", "placeholder", "Enter your email");

        // Assert presence of the "Send Reset Instructions" button
        cy.contains("button span", "Send Reset Instructions")
            .should("exist")
            .and("be.visible");
    });

    it("should display confirmation message and allow return to login", () => {
        // Click on the "Forgot password?" link
        cy.contains("a", "Forgot password?")
            .should("be.visible")
            .and("have.attr", "href", "/auth/forgot-password").click();
        cy.wait(3000);
        // Fill in a valid email address
        cy.get("input[name='identifier']")
            .should("exist")
            .and("be.visible")
            .type("irachriskhan@gmail.com");
        cy.get("button[type='submit']").click();
        cy.wait(3000);
        // Assert presence of the text "Password Reset Email Sent"
        cy.contains("h3", "Password Reset Email Sent")
            .should("exist")
            .and("be.visible");

        // Assert presence of the "Return to login" link
        cy.contains("a", "Return to login")
            .should("exist")
            .and("be.visible")
            .and("have.attr", "href", "/auth/login");

        // 3. Assert redirection to login page if clicked
        cy.contains("a", "Return to login").click();
        cy.url().should("include", "/auth/login");

        // Optional: confirm login heading exists on redirected page
        cy.contains("h2", "Login to your account").should("be.visible");
    });
});
