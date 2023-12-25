<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScheduleXCalendar } from '../../..'
import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const calendarApp = createCalendar({
  views: [viewWeek, viewDay],
  selectedDate: '2023-12-18',
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-18',
      end: '2023-12-18',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-17',
      end: '2023-12-21',
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2023-12-22',
      end: '2023-12-28',
    },
    {
      id: 4,
      title: 'Event 4',
      start: '2023-12-22',
      end: '2023-12-28',
    },
  ],
})
</script>

<template>
  <div class="app">
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style>
.app {
  width: 100%;
}
</style>
