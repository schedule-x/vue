import { createCalendarHeaderPageObject } from '@schedule-x/e2e-testing'
import { createWeekViewPageObject } from '@schedule-x/e2e-testing'

describe('Smoke Test', () => {
  const calendarHeader = createCalendarHeaderPageObject()
  const weekView = createWeekViewPageObject()

  beforeEach(() => {
    cy.visit('/cypress/pages/001-smoke/001-smoke.html')
  })

  it('should navigate between views', () => {
    calendarHeader.openViewByLabel('Month')
    calendarHeader.openViewByLabel('Day')
    calendarHeader.openViewByLabel('Week')
  })

  it('should add, update and remove events', () => {
    const newEventOriginalTitle = 'Event 2'
    const newEventUpdatedTitle = 'Event 2 updated'
    weekView.getDateGridEventByTitle(newEventOriginalTitle).should('not.exist')
    cy.contains('add event').click()
    weekView.getDateGridEventByTitle(newEventOriginalTitle).should('exist')
    cy.contains('update event').click()
    weekView.getDateGridEventByTitle(newEventUpdatedTitle).should('exist')
    cy.contains('remove event').click()
    weekView.getDateGridEventByTitle(newEventUpdatedTitle).should('not.exist')
  })
})
