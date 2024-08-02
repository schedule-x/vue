import { defineComponent, watch, onMounted, h, PropType } from 'vue'
import { createDatePicker } from '@schedule-x/date-picker'
import type { IDatePickerConfig } from '@schedule-x/date-picker'

export default defineComponent({
  name: 'SxDatePicker',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    config: {
      type: Object as PropType<Omit<IDatePickerConfig, 'selectedDate'>>,
      default: () => ({
        listeners: {},
      }),
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit, expose }) {
    const elId = 'sx' + Math.random().toString(36).substr(2, 9)
    let app: ReturnType<typeof createDatePicker> | undefined = undefined

    const setTheme = (theme: 'light' | 'dark') => {
      app?.setTheme(theme)
    }

    expose({
      setTheme,
    })

    watch(
      () => props.modelValue,
      (newValue) => {
        if (app?.value === newValue) return

        if (app) {
          app.value = newValue
        }
      }
    )

    onMounted(() => {
      app = createDatePicker({
        ...props.config,
        listeners: {
          ...props.config.listeners,
          onChange: (date: string) => {
            emit('update:modelValue', date)
          },
        },
        selectedDate: props.modelValue,
      })
      app.render(document.getElementById(elId) as HTMLElement)
    })

    return () =>
      h('div', {
        id: elId,
        class: 'sx-vue-date-picker-wrapper',
      })
  },
})
