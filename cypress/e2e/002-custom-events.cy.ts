import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'

const calendarHeader = createCalendarHeaderPageObject()

describe('Custom events test on desktop', () => {
  beforeEach(() => {
    cy.visit('/cypress/pages/002-custom-events/002-custom-events.html')
  })

  it('should render custom events in week view', () => {
    cy.contains('Event 1').should('exist')
    cy.contains('Event 2').should('exist')
    cy.contains('Event 3').should('exist')
    cy.contains('Event 4').should('exist')
    cy.contains('Title: Event 5').should('exist')
    cy.contains('Id: 5').should('exist')
  })

  it('should render custom events in month view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.contains('Event 1').should('exist')
    cy.contains('Event 2').should('exist')
    cy.contains('Event 3').should('exist')
    cy.contains('Event 4').should('exist')
    cy.contains('Event 5').should('exist')
  })
})

describe('Custom events test on mobile', () => {
  beforeEach(() => {
    cy.visit('/cypress/pages/002-custom-events/002-custom-events.html')
    cy.viewport('iphone-6')
  })

  it('should render custom events in month agenda view', () => {
    calendarHeader.openViewByLabel('Month')
    cy.contains('Event 1').should('exist')
    cy.contains('Event 2').should('exist')
    cy.contains('Event 5').should('exist')
  })
})
