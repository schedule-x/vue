<template>
  <div class="custom-time-grid-event">
    <input type="checkbox">
    <div>Id: {{ calendarEvent.id }}</div>
    <div>Title: {{ calendarEvent.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  calendarEvent: {
    type: Object as PropType<{ title: string; id: number | string }>,
    required: true,
  },
})
</script>

<style>
.custom-time-grid-event {
  border: 2px solid black;
  border-radius: 4px;
  background-color: #fff;
  font-family: inherit;
  line-height: 1.5;
  padding: 0.125rem;
  width: 100%;
  height: 100%;
}
</style>
