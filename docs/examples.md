# MetalState Examples

Here are some practical examples of how to use MetalState in your React applications.

## Basic Counter Example

```tsx
import { createMetalState, useMetalState } from "@metalstate/core"

// Create the state
const counterState = createMetalState(0)

// Use the state in a component
function CounterComponent() {
  const [counter, setCounter, props] = useMetalState(counterState)

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </div>
  )
}
```

## Using Listeners outside of Component -- without useEffect

```tsx
import { createMetalState, useMetalState } from "@metalstate/core"

// Create the state
const counterState = createMetalState(0)

// Add a listener
counterState.listen((value) => console.log(value))

// Use the state in a component
function CounterComponent() {
  const [counter, setCounter, props] = useMetalState(counterState)

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </div>
  )
}
```

## Extending The State

```tsx
import { createMetalState, useMetalState } from "@metalstate/core"

// Create and extend the state
const counterState = createMetalState(0).extend({
  increment: function () {
    this.settle(this.get() + 1)
  },
  decrement: function () {
    this.settle(this.get() - 1)
  },
})

// Use the state in a component
function CounterComponent() {
  const [counter, setCounter, props] = useMetalState(counterState)

  return (
    <div>
      <p>{counter}</p>
      <button onClick={props.increment}>Increase</button>
      <button onClick={props.decrement}>Decrease</button>
    </div>
  )
}
```
