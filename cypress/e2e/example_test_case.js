import { RandomCustomer } from "../fixtures/customers";

describe("Minimal test case", () => {
    let customer = null

    beforeEach("Set-up tests", () => {
        customer = RandomCustomer();

        cy.visit('/')
    });

    it("test", () => {
        cy.get('[class="vnav__item"] a[href*="category-s"]')
            .contains('Automation TestProducts')
            .click({ force: true });

        cy.get('a [title="Automation $10 Product"]').scrollIntoView().click()
        cy.get('[id="btn_addtocart"]').click();
        cy.get('[data-shopping="content"] [data-product-index="1"]').should('exist').should('be.visible')
        cy.get('[class="push-cart"]').contains('Checkout').should('be.visible').click()
        cy.get('[id="emailAddress"]').should('be.visible').type(customer.email)
        cy.get('[id="firstName"]').should('be.visible').type(customer.firstName)
        cy.get('[id="lastName"]').should('be.visible').type(customer.lastName)
        cy.get('[id="address1"]').should('be.visible').type(customer.address)
        cy.get('[id="city"]').should('be.visible').type(customer.city)
        cy.get('[id="country"]').should('be.visible').select(customer.country)
        cy.get('[id="postalCode"]').should('be.visible').type(customer.zipCode)
        cy.get('[id="state"]').should('be.visible').select(customer.state)
        cy.get('[id="phoneNumber"]').should('be.visible').type(customer.phone)
        cy.get('[data-testid="address-form-submit-button"]').scrollIntoView().should('be.visible').click()
        cy.get('[data-testid="outerlabel-input"]')
            .contains('Default Rate')
            .parent('div')
            .find('[data-testid="radio-input"]')
            .click()
        cy.get('[data-testid="button-input"]').scrollIntoView().should('be.visible').click()
        cy.get('[data-testid="labeledradio-input"]')
            .contains('Cash')
            .parent('div')
            .find('[data-testid="radio-input"]')
            .check()
        cy.get('[id="password"]').scrollIntoView().should('be.visible').type(customer.password)
        cy.get('[data-testid="button-input"]').contains('Pay').scrollIntoView().should('be.visible').click()
        cy.get('#div_articleid_49')
            .should('be.visible')
            .should('include.text', 'Thank you for placing your order. Your order number is')
    })
})