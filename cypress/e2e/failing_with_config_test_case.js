import { RandomCustomer, DefaultCreditCard } from "../fixtures/customers";

describe("This test case fails", () => {
    let customer = null

    beforeEach("Test Set up", () => {
        cy.intercept('GET', '*main*.js', (req) => {
            req.continue((res) => {
                res.body = res.body.replaceAll('window.top', 'self')
            })
        })

        customer = RandomCustomer();
        cy.visit('/')
    });

    it("test case", () => {
        cy.get('[class="vnav__item"] a[href*="category-s"]')
            .contains('Automation TestProducts')
            .click({ force: true });
        cy.get(`a [title="Automation $10 Product"]`).scrollIntoView().click()
        cy.get('[id="btn_addtocart"]').click();
        cy.get('[data-shopping="content"] [data-product-index="1"]').should('exist').should('be.visible')
        cy.visit('/one-page-checkout.asp')
        cy.get('[name="BillingFirstName"]').type(customer.firstName)
        cy.get('[name="BillingLastName"]').type(customer.lastName)
        cy.get('[name="BillingAddress1"]').type(customer.address)
        cy.get('[name="BillingCity"]').type(customer.city)
        cy.get('[name="BillingCountry"]').select(customer.country)
        cy.get('[name="BillingState_dropdown"]').select(customer.state)
        cy.get('[name="BillingPostalCode"]').type(customer.zipCode)
        cy.get('[name="BillingPhoneNumber"]').type(customer.phone)
        cy.get('[name="Email"]').type(customer.email)
        cy.get('[name="ShipResidential"]').first().check()
        cy.get('[name="ShippingSpeedChoice"]').should('exist').should('be.visible').select('Default Rate $5.00')
        cy.get('[name="PaymentMethod"]').should('be.visible').check('Credit Card')

        cy.get('[name="CardHoldersName"]').type(DefaultCreditCard.name)

        cy.get('[id="CreditCardNumber"] > iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .within($body => cy.wrap($body))
            .find('[name="card_number"]')
            .should('exist')
            .type(DefaultCreditCard.number)

        cy.get('[id="CC_ExpDate_Month"]').select(DefaultCreditCard.monthExp)
        cy.get('[id="CC_ExpDate_Year"]').select(DefaultCreditCard.yearExp)
        cy.get('[id="CVV2"] > iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .within($body => cy.wrap($body))
            .find('[id="cvv"]')
            .should('exist')
            .clear()
            .type(DefaultCreditCard.securityCode)

        cy.wait(3000)
        cy.get('[id="btnSubmitOrder"]').click({ force: true })
        cy.get('[id="FormatListofErrorsDiv"] ul').find('li').eq(0).should('exist').should('be.visible').should('have.text', 'Please fill in the  field Password.')
    })
})