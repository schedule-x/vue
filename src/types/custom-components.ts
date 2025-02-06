import { Component } from 'vue'
import { CustomComponentName } from '@schedule-x/shared'

export type CustomComponents = {
  [key in CustomComponentName]?: Component
}

export type CustomComponentMeta = {
  Component: Component
  wrapperElement: HTMLElement
}
export type CustomComponentsMeta = CustomComponentMeta[]
