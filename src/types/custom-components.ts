import { Component } from 'vue'

export type CustomComponents = {
  timeGridEvent?: Component
  dateGridEvent?: Component
}
export type CustomComponentMeta = {
  Component: Component<unknown, unknown>
  wrapperElement: HTMLElement
}
export type CustomComponentsMeta = CustomComponentMeta[]
