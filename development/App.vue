<script setup lang="ts">
import Calendar from '../src/calendar.ts'
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { ref } from 'vue'

const counter = ref(0)

const incrementCounter = () => {
  counter.value++
}

const sxCal = createCalendar({
  views: [viewWeek, viewMonthGrid, viewDay, viewMonthAgenda],
  events: [
    {
      id: 1,
      title: 'Event 1',
      time: {
        start: '2023-12-18',
        end: '2023-12-18',
      },
    },
  ],
})

const addEvent = () => {
  sxCal.events.add({
    id: 2,
    title: 'Event 2',
    time: {
      start: '2023-12-19',
      end: '2023-12-19',
    },
  })
}
</script>

<template>
  <div class="app">
    <Calendar :calendar-app="sxCal" />

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
