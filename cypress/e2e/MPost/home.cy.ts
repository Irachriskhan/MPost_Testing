describe("Automation Test of MPost website", () => {
  beforeEach(() => {
    // Step-1: Navigate to http://staging.mpost.global/ url
    cy.visit("https://staging.mpost.global/");
    // Assert url redirection
    cy.url().should("eq", "https://staging.mpost.global/");
    // Accept cookies if the popup appears
    cy.get("#rcc-decline-button").click();
    cy.wait(2000);
  });

  // --------------------------- Test 1-------------------------------------------------

  // it("Verify Home Page loads successfully and SEO Tags", () => {
  //   // Assert on the presence of the main header
  //   cy.get("nav").should("be.visible");
  //   // cy.get(" div[class='hidden md:flex space-x-8']").should("be.visible");
  //   // Assert the title of the page
  //   cy.title().should("eq", "MPost - Exchange Anything. Anytime. Anywhere.");
  //   // Assert the meta description of the page
  //   cy.get('head meta[name="description"]')
  //     .should("have.attr", "content")
  //     .and(
  //       "eq",
  //       "MPost - Join millions of individuals and businesses using MPOST as their universal digital address—enabling secure mail and parcel delivery, hassle-free returns for online shoppers, and seamless identity verification for both local and global transactions."
  //     );
  //   // Assert on the presence of the logo
  //   cy.get(
  //     "div[class='flex items-center'] > a[class='text-2xl font-bold text-white flex items-center']"
  //   ).should("be.visible");
  //   // Assert on the “Get Your Address” button
  //   cy.get("div[class='space-y-8'] > a[href='/auth/registration']")
  //     .should("be.visible")
  //     .and("contain.text", "Get Your Address").click();
  //   cy.wait(2000);
  //   // Assert on the redirection to the registration page
  //   cy.url().should("eq", "https://staging.mpost.global/auth/registration");
  // });

  // -------------------------------------------- Test 2---------------------------------------------
  it("should scroll from top to bottom and validate sections", () => {
    // Validate Hero Section
    cy.contains("The Global Challenge").should("be.visible").scrollIntoView();
    cy.get("img").first().should("be.visible");

    // // Scroll to Features Section
    // cy.scrollTo("center");
    // cy.contains("Features").should("be.visible");
    // cy.contains("Track your mail").should("be.visible");
    // cy.get("section img").eq(1).should("be.visible");

    // Scroll to How It Works Section
    cy.scrollTo("bottom");
    cy.contains("How it works").should("be.visible");
    cy.contains("Step 1").should("be.visible");
    cy.get("section img").eq(2).should("be.visible");

    // Validate Footer Contact Details
    cy.get("footer").within(() => {
      cy.contains("Contact").should("be.visible");
      cy.contains("info@mpost.global").should("be.visible");
      cy.contains("+254").should("be.visible"); // example phone
    });
  });

  // --------------------------- Test 2---------------------------------------------
  // it("Verify the MPost navigation menu links", () => {
  //   // Assert on the banner’s visibility
  //   cy.get(" div[class='hidden md:flex space-x-8']")
  //     .should("be.visible")
  //     .then((nav) => {
  //       // Get all the links in the navigation menu
  //       const links = nav.find("a");
  //       expect(links.length).to.equal(4);
  //     });
  //   // Define the expected URLs
  //   const expectedUrls: string[] = [
  //     "https://staging.mpost.global/",
  //     "https://staging.mpost.global/our-solution",
  //     "https://staging.mpost.global/about-us",
  //     "https://staging.mpost.global/partners",
  //   ];
  //   // Use a for loop to click on every URL and verify it
  //   for (let i = 0; i < expectedUrls.length; i++) {
  //     cy.visit("https://staging.mpost.global/");
  //     cy.get("div[class='hidden md:flex space-x-8']")
  //       .should("be.visible")
  //       .find("a")
  //       .eq(i)
  //       .then(($link) => {
  //         const href = $link.prop("href");
  //         expect(href).to.equal(expectedUrls[i]);
  //         cy.wrap($link).invoke("removeAttr", "target").click();
  //         cy.wait(3000);
  //       });
  //     cy.url().should("eq", expectedUrls[i]);
  //     cy.wait(1000);
  //   }
  //   // Assert on the presence of the logo
  //   cy.get(
  //     "div[class='flex items-center'] > a[class='text-2xl font-bold text-white flex items-center']"
  //   )
  //     .should("be.visible")
  //     .click();
  // });

  // --------------------------- Test 3-------------------------------------------------

  // it("Verify the Bottom Navigation bar buttons", () => {
  //   // Step-3: Scroll to Geolocation section and validate its elements
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   )
  //     .scrollIntoView()
  //     .should("be.visible");
  //   // Assert on the Real time text delivery availability
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0']"
  //   ).contains("REAL-TIME DELIVERY ALERTS");
  //   // Assert on the paragraph text below the Real time text delivery availability
  //   cy.get(
  //     "h2[class='text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight']"
  //   ).should("be.visible");

  //   // Step-2: Validate the Navigation buttons
  //   cy.get(
  //     "div[class='absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-10'] > div[class='flex justify-center space-x-1 sm:space-x-2']"
  //   )
  //     .should("be.visible")
  //     .then((buttonsList) => {
  //       // Get all buttons in the navigation bottom banner
  //       const buttons = buttonsList.find("button");
  //       cy.log(`List of Buttons  is: ${buttons}`);
  //       expect(buttons.length).to.equal(6);
  //     });

  //   // Use a for loop to click on every button and verify it
  //   let n = 6; // Number of buttons
  //   for (let i = 1; i < n; i++) {
  //     cy.get(
  //       "div[class='absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-10'] > div[class='flex justify-center space-x-1 sm:space-x-2']"
  //     )
  //       .should("be.visible")
  //       .find("button")
  //       .eq(i)
  //       .then(($button) => {
  //         const beforeColor = $button.css("background-color");
  //         cy.log("Before color: " + beforeColor);
  //         cy.wrap($button).click();
  //         cy.wait(2000);
  //         cy.get(
  //           "div[class='absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-10'] > div[class='flex justify-center space-x-1 sm:space-x-2']"
  //         )
  //           .find("button")
  //           .eq(i)
  //           .then(($btnAfter) => {
  //             const afterColor = $btnAfter.css("background-color");
  //             cy.log("After color: " + afterColor);
  //             expect(afterColor, "Highlight color should change").to.not.eq(
  //               beforeColor
  //             );
  //           });
  //       });
  //     cy.wait(1000);
  //   }
  // });

  // --------------------------- Test 3-------------------------------------------------

  // it("Navigate the MPost Home Page to the bottom and Assert Text content", () => {
  //   // Assert on the banner’s visibility
  //   cy.get("nav.bg-mpost-blue.text-white.py-4").should("be.visible");

  //   // Assert on the Hot sellers products section
  //   cy.get(
  //     "h1[class='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight']"
  //   )
  //     .contains(
  //       "Powering Universal Access and Exchange with a Universal Digital Address"
  //     )
  //     .should("be.visible");

  //   // Assert on the global navigation section
  //   cy.get(".text-mpost-blue.text-2xl.font-normal.mb-4").should("be.visible");
  //   // // Assert on the paragraph text below the global title
  //   cy.get(
  //     "p[class='text-xl sm:text-2xl font-light text-mpost-text-dark mb-4 sm:mb-6 text-left leading-relaxed']"
  //   ).should("be.visible");

  //   // Step-3: Scroll to Geolocation section and validate its elements
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   )
  //     .scrollIntoView()
  //     .should("be.visible");
  //   // Assert on the Real time text delivery availability
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0']"
  //   ).contains("REAL-TIME DELIVERY ALERTS");
  //   // Assert on the paragraph text below the Real time text delivery availability
  //   cy.get(
  //     "h2[class='text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight']"
  //   ).should("be.visible");

  //   // Step-4: Scroll to Universal address section and validate its elements
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   )
  //     .scrollIntoView()
  //     .should("be.visible");
  //   // Assert on the Universal address text availability
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   ).contains("A UNIVERSAL ADDRESS");
  //   // Assert on the paragraph text below the Universal address title
  //   cy.get(
  //     "h2[class='text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight']"
  //   ).contains("Never lose a delivery again, no matter where life takes you.");

  //   //Step-5: Scroll to Geolocation section and validate its elements
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   )
  //     .scrollIntoView()
  //     .should("be.visible");
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   ).should("be.visible");
  //   cy.wait(2000);

  //   // Assert on the Geolocation text availability
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   ).contains("GEOLOCATION");
  //   // Assert on the paragraph text below the Universal address title
  //   cy.get(
  //     "h2[class='text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight']"
  //   ).contains("You're always in control of where your deliveries go.");

  //   // //Step-6: Navigate to Parcel Locker section
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   )
  //     .scrollIntoView()
  //     .should("be.visible");
  //   // Assert on the Geolocation text availability
  //   cy.get(
  //     "div[class='relative h-full flex justify-center flex-col max-w-[600px] mx-auto lg:mx-0'] div[class='relative']"
  //   ).contains("PARCEL LOCKERS");
  //   // Assert on the paragraph text below the Universal address title
  //   cy.get(
  //     "h2[class='text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight']"
  //   ).contains("You're always in control of where your deliveries go.");
  // });
});
