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
// import CustomTimeGridEvent from './components/CustomTimeGridEvent.vue'
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
  // timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
}
</script>

<template>
  <div class="app">
    <Calendar :calendar-app="calendarApp" :custom-components="customComponents">
      <template #timeGridEvent="{ calendarEvent }">
        <div
          :style="{ backgroundColor: 'green', color: '#fff', height: '100%' }"
        >
          <div>Hello from Vue slot</div>

          <div>{{ calendarEvent.title }}</div>

          <div>{{ counter }}</div>
        </div>
      </template>

      <!--      <template #dateGridEvent="{ calendarEvent }">-->
      <!--        <div :style="{ backgroundColor: 'green', color: '#fff', height: '100%', width: '100%' }">-->
      <!--          <div>{{ calendarEvent.title }}</div>-->
      <!--        </div>-->
      <!--      </template>-->

      <template #monthAgendaEvent="{ calendarEvent }">
        <div :style="{ backgroundColor: 'cornflowerblue', color: '#fff', height: '80px', width: '100%' }">
          <div>{{ calendarEvent.title }}</div>
          <div>Counter: {{ counter }}</div>
        </div>
      </template>

      <template #monthGridEvent="{ calendarEvent, hasStartDate }">
        <div :style="{
          backgroundColor: 'green',
          color: '#fff',
          height: '100%',
          width: '100%',
          borderLeft: hasStartDate ? '5px solid lightgreen' : 'none',
        }">
          <span :style="{ paddingLeft: '4px' }">{{ calendarEvent.title }}</span>
          &#8226;
          <span>{{ counter }}</span>
        </div>
      </template>
    </Calendar>

    <button @click="addEvent">add event</button>

    <button class="button" @click="incrementCounter">increment counter</button>

    <div>{{ counter }}</div>
  </div>
</template>

<style>
.app {
  width: 100%;
}

.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #1976d2;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}
</style>
