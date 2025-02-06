import {
  defineComponent,
  Fragment,
  h,
  isReactive,
  PropType,
  Teleport,
} from 'vue'
import { CalendarApp } from '@schedule-x/calendar'
import type {
  CustomComponentMeta,
  CustomComponents,
  CustomComponentsMeta,
} from './types/custom-components'
import { createCustomComponent } from './utils/stateful/custom-components'
import { ReactivityError } from './utils/stateless/errors/reactivity.error'

export default defineComponent({
  name: 'ScheduleXCalendar',

  props: {
    calendarApp: {
      type: Object as PropType<CalendarApp>,
      required: true,
    },
    customComponents: {
      type: Object as PropType<CustomComponents>,
      default: () => ({}),
    },
  },

  data() {
    return {
      elId: 'sx' + Math.random().toString(36).substr(2, 9),
      customComponentsMeta: [] as CustomComponentsMeta,
    }
  },

  mounted() {
    if (isReactive(this.calendarApp)) {
      throw new ReactivityError(
        'calendarApp cannot be saved in a ref. Since this causes deep reactivity, it destroys the calendars internal reactivity. Save in a normal const or shallowRef'
      )
    }

    const allCustomVNodes = {
      ...this.customComponents,
      ...this.$slots,
    }

    for (const [componentName, component] of Object.entries(allCustomVNodes)) {
      if (!component) continue

      this.calendarApp._setCustomComponentFn(
        componentName,
        createCustomComponent(this.setCustomComponentMeta, component)
      )
    }
    this.calendarApp.render(document.getElementById(this.elId) as HTMLElement)
  },

  unmounted() {
    this.calendarApp.destroy()
  },

  methods: {
    setCustomComponentMeta(component: CustomComponentMeta) {
      const wrapperWasDetached = !(
        component.wrapperElement instanceof HTMLElement
      )
      if (wrapperWasDetached) return

      const filterOutComponentsWithDetachedWrappers = ({
        wrapperElement,
      }: {
        wrapperElement: HTMLElement | null
      }) => wrapperElement instanceof HTMLElement
      const newCustomComponents = [
        ...this.customComponentsMeta.filter(
          filterOutComponentsWithDetachedWrappers
        ),
      ]
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

  render() {
    const customVNodes = this.customComponentsMeta.map(
      ({ Component, wrapperElement }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return h(Teleport, { to: wrapperElement }, Component)
      }
    )

    return h(
      'div',
      {
        id: this.elId,
        class: 'sx-vue-calendar-wrapper',
      },
      h(Fragment, {}, customVNodes)
    )
  },
})
