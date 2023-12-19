import { defineComponent, h, PropType } from 'vue'
import { CalendarApp } from '@schedule-x/calendar'

export default defineComponent({
  name: 'ScheduleXCalendar',

  props: {
    calendarApp: {
      type: Object as PropType<CalendarApp>,
      required: true,
    },
  },

  data() {
    return {
      elId: 'sx' + Math.random().toString(36).substr(2, 9),
    }
  },

  mounted() {
    this.calendarApp.render(document.getElementById(this.elId))
  },

  render() {
    return h('div', {
      id: this.elId,
      class: 'sx-vue-calendar-wrapper',
    })
  },
})
