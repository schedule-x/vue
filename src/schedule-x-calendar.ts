import { defineComponent, Fragment, h, PropType, Teleport } from 'vue'
import { CalendarApp } from '@schedule-x/calendar'
import type {
  CustomComponentMeta,
  CustomComponents,
  CustomComponentsMeta,
} from './types/custom-components'
import { createCustomComponent } from './utils/stateful/custom-components'

export default defineComponent({
  name: 'ScheduleXCalendar',

  props: {
    calendarApp: {
      type: Object as PropType<CalendarApp>,
      required: true,
    },
    customComponents: {
      type: Object as PropType<CustomComponents>,
    },
  },

  data() {
    return {
      elId: 'sx' + Math.random().toString(36).substr(2, 9),
      customComponentsMeta: [] as CustomComponentsMeta,
      renderKey: 0,
    }
  },

  methods: {
    setCustomComponentMeta(component: CustomComponentMeta) {
      const newCustomComponents = [...this.customComponentsMeta]
      const ccid = component.wrapperElement.dataset.ccid
      const existingComponent = newCustomComponents.find(
        ({ wrapperElement }) => wrapperElement.dataset.ccid === ccid
      )

      if (existingComponent) {
        newCustomComponents.splice(
          newCustomComponents.indexOf(existingComponent),
          1
        )
      }

      this.customComponentsMeta = [...newCustomComponents, component]
    },
  },

  mounted() {
    for (const [componentName, component] of Object.entries(
      this.customComponents
    )) {
      this.calendarApp._setCustomComponentFn(
        componentName,
        createCustomComponent(this.setCustomComponentMeta, component)
      )
    }
    this.calendarApp.render(document.getElementById(this.elId) as HTMLElement)
  },

  render() {
    const customVNodes = this.customComponentsMeta.map(
      ({ Component, wrapperElement }) => {
        return h(Teleport, { to: wrapperElement }, Component)
      }
    )

    return h(
      'div',
      {
        id: this.elId,
        class: 'sx-vue-calendar-wrapper',
        key: this.renderKey,
      },
      h(Fragment, {}, customVNodes)
    )
  },
})
