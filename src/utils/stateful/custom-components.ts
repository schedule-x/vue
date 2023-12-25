import type { CustomComponentMeta } from '../../types/custom-components.ts'
import { Component, h } from 'vue'

export const createCustomComponent =
  (
    setCustomComponent: (component: CustomComponentMeta) => void,
    customTimeGridEventComponent: Component
  ) =>
  (wrapperElement: HTMLElement, props: Record<string, unknown>) => {
    const componentMeta: CustomComponentMeta = {
      Component: h(customTimeGridEventComponent, props),
      wrapperElement,
    }
    setCustomComponent(componentMeta)
  }
