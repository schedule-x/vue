import {
  defineComponent,
  Fragment,
  h,
  isReactive,
  PropType,
  SlotsType,
  Teleport
} from 'vue'
import { CalendarApp, CalendarEventExternal } from '@schedule-x/calendar'
import type {CalendarAppSingleton} from '@schedule-x/shared';
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

  slots: Object as SlotsType<{
    timeGridEvent: { calendarEvent: CalendarEventExternal },
    dateGridEvent: { calendarEvent: CalendarEventExternal },
    weekGridDate: { date: string },
    weekGridHour: { hour: number, gridStep: { hour: number, minute: number } },
    monthGridEvent: { calendarEvent: CalendarEventExternal, hasStartDate: boolean },
    monthGridDayName: { /** 0-6, like in JS-dates */ day: number },
    monthGridDate: { /** Day-of-the-month */ date: number, jsDate: Date },
    monthAgendaEvent: { calendarEvent: CalendarEventExternal },
    eventModal: { calendarEvent: CalendarEventExternal },
    headerContentLeftPrepend: { $app: CalendarAppSingleton },
    headerContentLeftAppend: { $app: CalendarAppSingleton },
    headerContentRightPrepend: { $app: CalendarAppSingleton },
    headerContentRightAppend: { $app: CalendarAppSingleton },
    headerContent: { $app: CalendarAppSingleton },
    sidebarAddEventButton: { onClick: unknown },
    resourceEvent: { calendarEvent: CalendarEventExternal, resource: unknown }
  }>,

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

    this.calendarApp._setDestroyCustomComponentInstance((ccid: string) => {
      this.customComponentsMeta = this.customComponentsMeta.filter(
        (component) => component.wrapperElement.dataset.ccid !== ccid
      )
    })

    const allCustomVNodes = {
      ...this.customComponents,
      ...this.$slots,
    }

    for (const [componentName, component] of Object.entries(allCustomVNodes)) {
      if (!component || componentName === 'default') continue

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
