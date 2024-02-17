^^^
<script setup>
import { ScheduleXCalendar } from '../../..'

import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createResizePlugin } from '@schedule-x/resize'

const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  plugins: [createResizePlugin()],
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
  ],
  calendars: {
    work: {
      colorName: 'work',
      lightColors: {
        container: '#fff',
        onContainer: '#000',
        main: '#fff',
      },
      darkColors: {
        container: '#000',
        onContainer: '#fff',
        main: '#000',
      },
    },
  },
})
</script>

<template>
  <div>
    <ClientOnly>
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </ClientOnly>
  </div>
</template>
