<template>
  <div class="custom-event-modal">Custom Event Modal</div>
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
.custom-event-modal {
  border-radius: 4px;
  background-color: #fff;
  font-family: inherit;
  line-height: 1.5;
  width: 100%;
  height: 100%;
}
</style>
