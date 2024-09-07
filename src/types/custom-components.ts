import { Component } from 'vue'

export type CustomComponents = {
  timeGridEvent?: Component
  dateGridEvent?: Component
  monthGridEvent?: Component
  monthAgendaEvent?: Component
  eventModal?: Component
  headerContentLeftPrepend?: Component
  headerContentLeftAppend?: Component
  headerContentRightPrepend?: Component
  headerContentRightAppend?: Component
  headerContent?: Component
}
export type CustomComponentMeta = {
  Component: Component
  wrapperElement: HTMLElement
}
export type CustomComponentsMeta = CustomComponentMeta[]
