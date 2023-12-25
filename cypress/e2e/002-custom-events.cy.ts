import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'

describe('Custom events test', () => {
  const calendarHeader = createCalendarHeaderPageObject()

  beforeEach(() => {
    cy.visit('/cypress/pages/002-custom-events/002-custom-events.html')
  })

  it('should render custom events', () => {
    calendarHeader.openViewByLabel('Week')
    cy.contains('Event 1').should('exist')
    cy.contains('Event 2').should('exist')
    cy.contains('Event 3').should('exist')
    cy.contains('Event 4').should('exist')
    cy.contains('Title: Event 5').should('exist')
    cy.contains('Id: 5').should('exist')
  })
})
