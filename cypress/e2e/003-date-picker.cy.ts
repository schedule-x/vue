describe('Custom events test on desktop', () => {
  beforeEach(() => {
    cy.visit('/cypress/pages/003-date-picker/003-date-picker.html')
  })

  it('should update the selected date when clicking on a day', () => {
    cy.get('input').click()
    cy.wait(300)
    cy.get('.sx__date-picker__day').first().click()
    cy.get('#date-picker-model').should('have.text', '2024-07-01')

    cy.get('input').click()
    cy.wait(300)
    cy.get('.sx__date-picker__day').eq(10).click()
    cy.get('#date-picker-model').should('have.text', '2024-07-11')

    cy.get('input').click()
    cy.wait(300)
    cy.get('.sx__date-picker__day').eq(20).click()
    cy.get('#date-picker-model').should('have.text', '2024-07-21')
  })
})
