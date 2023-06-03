"use client"
import { useState, useEffect } from "react"
import { IMetal } from "./metalstate"

export const useMetalState = <T>(state: IMetal<T>) => {
  const [value, listener] = useState(state.get())

  useEffect(() => state.listen(listener), [listener])

  return [value, state.settle, state.props]
}
