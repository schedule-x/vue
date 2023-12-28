import { Component } from 'vue'

export type CustomComponents = {
  timeGridEvent?: Component
  dateGridEvent?: Component
  monthGridEvent?: Component
  monthAgendaEvent?: Component
}
export type CustomComponentMeta = {
  Component: Component
  wrapperElement: HTMLElement
}
export type CustomComponentsMeta = CustomComponentMeta[]
