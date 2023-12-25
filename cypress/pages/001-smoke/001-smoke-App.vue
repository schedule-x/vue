<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScheduleXCalendar } from '../../..'
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const calendarApp = createCalendar({
  views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-18',
      end: '2023-12-18',
    },
  ],
})

const newEventId = 2

const addEvent = () => {
  calendarApp.events.add({
    id: newEventId,
    title: 'Event 2',
    start: '2023-12-19',
    end: '2023-12-19',
  })
}

const updateEvent = () => {
  calendarApp.events.update({
    id: newEventId,
    title: 'Event 2 updated',
    start: '2023-12-19',
    end: '2023-12-19',
  })
}

const removeEvent = () => {
  calendarApp.events.remove(newEventId)
}
</script>

<template>
  <div class="app">
    <ScheduleXCalendar :calendar-app="calendarApp" />

    <button @click="addEvent">add event</button>

    <button @click="updateEvent">update event</button>

    <button @click="removeEvent">remove event</button>
  </div>
</template>

<style>
.app {
  width: 100%;
}
</style>
