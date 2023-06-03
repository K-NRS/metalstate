import { SetStateAction } from "react"

export interface IMetal<T> {
  value: T
  listeners: Array<SetStateAction<T>>
  get: () => any
  set: (newValue: any) => IMetal<T>
  emit: () => void
  settle: (newValue: any) => IMetal<T>
  listen: (listener: Function) => (() => void) | void
  extend: <U extends object>(
    newSettings: U
  ) => IMetal<T> & U & { [key: string]: any }
  [key: string]: any
}

export const createMetalState = <T>(initial: T): IMetal<T> => {
  const value: T = initial instanceof Function ? initial() : initial

  const state: IMetal<T> = {
    value,
    listeners: [],
    props: {},
    get: () => state.value,
    set: (newValue: any) => {
      state.value =
        newValue instanceof Function ? newValue(state.value) : newValue

      return state
    },
    emit: () =>
      state.listeners.forEach((listener: any) => listener(state.value)),
    settle: (newValue: any) => {
      state.set(newValue)
      state.emit()

      return state
    },
    listen: (listener: any) => {
      state.listeners.push(listener)

      return () => {
        state.listeners = state.listeners.filter((l: any) => l !== listener)
      }
    },
    extend: (newSettings: any) => {
      for (const key in newSettings) {
        if (newSettings[key] instanceof Function) {
          state.props[key] = newSettings[key].bind(state)
        } else {
          state.props[key] = newSettings[key]
        }
      }

      return state as IMetal<T> & typeof newSettings & { [key: string]: any }
    },
  }

  return state
}
