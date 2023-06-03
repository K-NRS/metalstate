import { IMetal, createMetalState } from "../lib/metalstate"

describe("createMetalState", () => {
  it("should create a new state with the initial value", () => {
    const initialState = 0
    const state = createMetalState(initialState)

    expect(state.get()).toBe(initialState)
  })

  it("should update the state value", () => {
    const initialState = 0
    const newState = 1
    const state = createMetalState(initialState)

    state.set(newState)

    expect(state.get()).toBe(newState)
  })

  it("should call the listeners when the state changes", () => {
    const listener = jest.fn()
    const state = createMetalState(0)

    state.listen(listener)
    state.settle(1)

    expect(listener).toHaveBeenCalledWith(1)
  })

  it("should extend the state with additional properties", () => {
    const state: any = createMetalState(0).extend({
      increment: function (this: typeof state) {
        this.settle(this.get() + 1)
      },
    })

    expect(state.props.increment).toBeDefined()
    state.props.increment()
    expect(state.get()).toBe(1)
  })

  it("should add non-function properties to props when extended", () => {
    const state = createMetalState(0).extend({
      someProperty: "someValue",
    })

    expect(state.props.someProperty).toBe("someValue")
  })

  it("should handle when initial value is a function", () => {
    const initialState = () => 0
    const state = createMetalState(initialState)

    expect(state.get()).toBe(0)
  })

  it("should handle when value given to set function is a function", () => {
    const state = createMetalState(0)

    state.set((prevValue: number) => prevValue + 1)

    expect(state.get()).toBe(1)
  })
})
