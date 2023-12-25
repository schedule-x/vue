<script setup lang="ts">
import Calendar from '../src/schedule-x-calendar.ts'
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { ref } from 'vue'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { seededEvents } from './data/seeded-events.ts'
import { CustomComponents } from '../src/types/custom-components.ts'
import CustomTimeGridEvent from './components/CustomTimeGridEvent.vue'
import CustomDateGridEvent from './components/CustomDateGridEvent.vue'

const counter = ref(0)

const incrementCounter = () => {
  counter.value++
}

const calendarApp = createCalendar({
  views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
  events: seededEvents,
  plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
})

const addEvent = () => {
  calendarApp.events.add({
    id: 2,
    title: 'Event 2',
    start: '2023-12-19',
    end: '2023-12-19',
  })
}

const customComponents: CustomComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
}
</script>

<template>
  <div class="app">
    <Calendar
      :calendar-app="calendarApp"
      :custom-components="customComponents"
    />

    <button @click="addEvent">add event</button>

    <button @click="incrementCounter">increment counter</button>

    <div>{{ counter }}</div>
  </div>
</template>

<style>
.app {
  width: 100%;
}
</style>
