<template>
  <div class="lol-component">
    Hello from Vue
    <div>Id: {{ calendarEvent.id }}</div>
    <div>Title: {{ calendarEvent.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  calendarEvent: {
    type: Object as PropType<{ title: string; id: number | string }>,
    required: true,
  },
})

console.log(props.calendarEvent)
</script>

<style>
.lol-component {
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
