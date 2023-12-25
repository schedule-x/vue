import type { CustomComponentMeta } from '../../types/custom-components.ts'
import { Component, h } from 'vue'

export const createCustomComponent =
  (
    setCustomComponent: (component: CustomComponentMeta) => void,
    customComponent: Component
  ) =>
  (wrapperElement: HTMLElement, props: Record<string, unknown>) => {
    const componentMeta: CustomComponentMeta = {
      Component: h(customComponent, props),
      wrapperElement,
    }
    setCustomComponent(componentMeta)
  }
