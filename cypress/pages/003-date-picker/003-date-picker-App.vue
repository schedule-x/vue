<script setup lang="ts">
import { SxDatePicker } from '../../..'
import '@schedule-x/theme-default/dist/date-picker.css'
import { ref } from 'vue'

const datePickerModel = ref<string>('2024-07-12')
</script>

<template>
  <div class="app">
    <p id="date-picker-model">{{ datePickerModel }}</p>

    <SxDatePicker
      ref="datePickerRef"
      v-model="datePickerModel"
    />

    <p :style="{ marginBottom: '300px' }">Hello world</p>
  </div>
</template>

<style>
.app {
  width: 100%;
}
</style>
