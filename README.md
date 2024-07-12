![qalendar](https://schedule-x.s3.eu-west-1.amazonaws.com/schedule-x-logo.png)

# @schedule-x/vue

This package offers Vue components for the Schedule-X calendar and date picker. For the full documentation, please refer to: https://schedule-x.dev/

## Quick start examples

### Calendar

```vue
<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
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
})
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
```

### Date picker

```vue
<script setup lang="ts">
import { SxDatePicker } from '@schedule-x/vue'
import '@schedule-x/theme-default/dist/date-picker.css'
import { ref } from 'vue'

const datePickerModel = ref<string>('2024-07-12')
</script>

<template>
  <div>
    <p id="date-picker-model">{{ datePickerModel }}</p>

    <SxDatePicker ref="datePickerRef" v-model="datePickerModel" />
  </div>
</template>
```
