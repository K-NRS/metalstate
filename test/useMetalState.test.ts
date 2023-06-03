import { renderHook, act } from "@testing-library/react"
import { IMetal, createMetalState, useMetalState } from "../lib"

describe("useMetalState", () => {
  it("should return the current state value and a setter function", () => {
    const initialState = 0
    const state = createMetalState(initialState)
    const { result } = renderHook(() => useMetalState(state))

    expect(result.current[0]).toBe(initialState)

    act(() => {
      result.current[1](1)
    })

    expect(result.current[0]).toBe(1)
  })

  it("should return the extended properties", () => {
    const state: IMetal<number> = createMetalState(0).extend({
      increment: function (this: typeof state) {
        this.settle(this.get() + 1)
      },
    })

    const { result } = renderHook(() => useMetalState(state))

    act(() => {
      result.current[2].increment()
    })

    expect(result.current[0]).toBe(1)
  })
})
