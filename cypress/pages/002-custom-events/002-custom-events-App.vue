<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScheduleXCalendar } from '../../..'
import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import CustomDateGridEvent from '../../../development/components/CustomDateGridEvent.vue'
import CustomTimeGridEvent from '../../../development/components/CustomTimeGridEvent.vue'

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
    {
      id: 5,
      title: 'Event 5',
      start: '2023-12-18 04:15',
      end: '2023-12-18 05:15',
    },
  ],
})

const customComponents = {
  dateGridEvent: CustomDateGridEvent,
  timeGridEvent: CustomTimeGridEvent,
}
</script>

<template>
  <div class="app">
    <ScheduleXCalendar
      :calendar-app="calendarApp"
      :custom-components="customComponents"
    >
      <template #dateGridEvent="{ calendarEvent }">
        <div :style="{ backgroundColor: 'green', color: '#fff', height: '100%', width: '100%' }">
          <div>{{ calendarEvent.title }}</div>
        </div>
      </template>
    </ScheduleXCalendar>
  </div>
</template>

<style>
.app {
  width: 100%;
}
</style>
