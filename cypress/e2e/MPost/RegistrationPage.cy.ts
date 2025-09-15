describe('MPost Registration Page Tests', () => {
    const baseUrl = 'https://staging.mpost.global/auth/registration'

    function selectAccountType(type: string) {
        cy.get("#account_type").click({ force: true })
        cy.get(`div[title='${type}']`).click()
        cy.get(".ant-select-selection-item")
            .should("have.attr", "title", type)
            .and("contain.text", type)
        // Submit the form
        // cy.get("form > div[class='flex gap-3 pt-4'] > button[type='submit']").click();
    }

    function fillPersonalDetails() {
        // Fill Full Name
        cy.get('input[name="names"]')
            .should('have.attr', 'placeholder', 'Full Name')
            .type('Paul Bakana')
            .should('have.value', 'Paul Bakana')

        // Select country of Rwanda
        cy.get('select[name="phone_numberCountry"]')
            .select('RW')
            .should('have.value', 'RW')

        // Fill phone number
        cy.get('input[name="phone_number"]')
            .clear()
            .type('+250 788 123 456')
            .should('have.value', '+250 788 123 456')

        // Select identification type (example: Passport)
        cy.get('#identification_type')
            .click({ force: true })
        // open dropdown and select National ID
        cy.get('.ant-select-dropdown')
            .contains('National ID')
            .click()
        cy.get('.ant-select-selector').should('contain.text', 'National ID')
        // open dropdown and select Passport
        cy.get('#identification_type')
            .click({ force: true })
        cy.get('.ant-select-dropdown')
            .contains('Passport')
            .click()
        cy.get('.ant-select-selector').should('contain.text', 'Passport')

        // Fill Identification Number
        cy.get('input[name="identification_number"]')
            .type('AB1234567')
            .should('have.value', 'AB1234567')

        // Fill Email
        cy.get('input[name="email"]')
            .type('paulbakana@example.com')
            .should('have.value', 'paulbakana@example.com')

        // Tick Terms checkbox
        cy.get('input[name="terms"]')
            .check({ force: true })
            .should('be.checked')
    };

    function fillAddressDetails() {
        // Assert Country dropdown is visible
        cy.get("#country").should("be.visible")
            .click({ force: true });
        cy.get("#country").click();
        // cy.get("div[title='Rwanda']", { timeout: 3000 }).click();
        // cy.get("#country").should("have.value", "Rwanda");
        // Type "Rwanda" into the search box
        cy.get("#country").type("Rwanda{enter}");

        // Assert that "Rwanda" is now selected
        cy.get(".ant-select-selection-item")
            .should("have.attr", "title", "Rwanda")
            .and("contain.text", "Rwanda");

        // Assert City input is visible
        cy.get("#city").should("be.visible");
        // Enter City
        cy.get("#city").type("Kigali").should("have.value", "Kigali");

        // Assert Street Number input is visible
        cy.get("#street_number").should("be.visible");
        // Enter Street Number
        cy.get("#street_number").type("KG 123 St").should("have.value", "KG 123 St");

        // Assert Back button is visible
        cy.get("button[type='button']").contains("Back").should("be.visible");
        // Assert Continue button is visible
        cy.get("button[type='submit']").contains("Continue").should("be.visible");

        // Click Continue
        cy.get("button[type='submit']").contains("Continue").click();
    }

    function displayCongratulatoryMessage() {
        // Assert success image is visible
        cy.get('img[alt="Registration success"]').should("be.visible");

        // Assert the heading
        cy.get("h1")
            .should("be.visible")
            .and("contain.text", "Registration Complete");

        // Assert confirmation text
        cy.get(".space-y-2 p")
            .should("be.visible")
            .and("contain.text", "Your Virtual P.O Box is now active and ready to use");

        // Assert welcome message
        cy.get("p.text-gray-700")
            .should("be.visible")
            .and("contain.text", "Welcome to seamless deliveries and smarter communication!");

        // Assert Go to Dashboard button
        cy.get("a[href='/dashboard'] button")
            .should("be.visible")
            .and("contain.text", "Go to Dashboard");

        // Optional: click the button and assert redirect
        cy.get("a[href='/dashboard'] button").click();
        cy.url().should("include", "/dashboard");
    };

    //---------------------------------------------- Test Cases ------------------------------

    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit(baseUrl)
        cy.url().should('eq', baseUrl);
        // Accept cookies if the popup appears
        cy.get("#rcc-decline-button").click();
        cy.wait(2000);
    })

    it('should load the registration page successfully', () => {
        cy.url().should('include', '/auth/registration')
        cy.get("div > h1[class='text-xl sm:text-4xl md:text-5xl font-semibold mb-1 text-white text-center md:text-left']").contains('Registration').should('be.visible')
        cy.get("form > div[class='flex gap-3 pt-4'] > button[type='submit']").should('be.visible').contains('Continue')
    });

    it('should show validation error when submitting without selecting account type', () => {
        cy.get("form > div[class='flex gap-3 pt-4'] > button[type='submit']").click();
        cy.get("div[class='text-red-500 text-sm']").contains('Required').should('be.visible');
    })

    it('should show errors when required fields are empty', () => {
        // Select Individual account type
        selectAccountType('Individual');
        // Try submitting without filling anything
        cy.get('button[type="submit"]').contains('Continue').click()
        cy.wait(2000)
        // Submit
        cy.get('button[type="submit"]').contains('Continue').click()
        // Assert validation messages for all required fields
        // cy.get('select[name="accountType"]')
        //     .parent()
        //     .find(".text-red-500")
        //     .should("contain.text", "Required");
        cy.get('input[name="names"]')
            .parent()
            .find(".text-red-500")
            .should("contain.text", "Required");

        cy.get('input[name="phone_number"]')
            .parent()
            .parent()
            .find(".text-red-500")
            .should("contain.text", "Required");

        cy.get('input[name="identification_number"]')
            .parent()
            .find(".text-red-500")
            .should("contain.text", "Required");
    })


    it('Should fillout the form with valid data', () => {
        // Select Individual account type
        selectAccountType('Company');
        selectAccountType('Individual');
        // Submit the form
        cy.get("form > div[class='flex gap-3 pt-4'] > button[type='submit']").click();
        // Assert on the navigation to the personal details section
        cy.contains('Enter Personal Details').should('be.visible')

        // Fill out the form fields
        fillPersonalDetails();
        // Submit
        cy.get('button[type="submit"]').contains('Continue').click()
        // Fill out the address details form
        fillAddressDetails();
    })

    it('Should show change the page body when selecting a valid account type - Business', () => {
        selectAccountType('Individual');
    });

    it('should validate email format', () => {
        selectAccountType('Individual');
        // Submit the form
        cy.get('button[type="submit"]').contains('Continue').click()
        cy.wait(2000)
        // Fill Full Name
        cy.get('input[name="names"]')
            .should('have.attr', 'placeholder', 'Full Name')
            .type('Paul Bakana')
            .should('have.value', 'Paul Bakana')
        cy.get('input[name="phone_number"]')
            .clear()
            .type('+250 788 123 456')
            .should('have.value', '+250 788 123 456')
        // open dropdown and select Passport
        cy.get('#identification_type')
            .click({ force: true })
        cy.get('.ant-select-dropdown')
            .contains('Passport')
            .click()
        // Fill Identification Number
        cy.get('input[name="identification_number"]')
            .type('AB1234567')
            .should('have.value', 'AB1234567')
        // Fill Invalid Email
        cy.get('input[name="email"]')
            .type('invalidEmail')
            .should('have.value', 'invalidEmail')
        // Submit
        cy.get('button[type="submit"]').click()
        // Assert for invalid email message
        cy.get('input[name="email"] + div.text-red-500')
            .should("contain.text", "Invalid email format");
    })

    it('should redirect to sign-in page when clicking "Sign In"', () => {
        cy.contains("Sign in").should("be.visible").click();
        cy.url().should('include', '/auth/login')
    })
})
