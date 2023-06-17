# MetalState API Reference

This document provides a detailed reference of the MetalState API.

## `createMetalState`

The `createMetalState` function allows you to create a new state object.

### Usage

```tsx
const counterState = createMetalState(0)
```

### `useMetalState`

The `useMetalState` hook allows you to use a MetalState in your React components. It returns a tuple where the first element is the state value, the second element is a setter function, and the third element is the `props` object containing any extended properties.

### Usage

```tsx
const [counter, setCounter, props] = useMetalState(counterState)
```

### `IMetal`

The `IMetal` interface defines the shape of a MetalState.

Properties

- `value`: The current state value.
- `listeners`: An array of functions that will be called when the state changes.
- `get`: A function that returns the current state value.
- `set`: A function that sets a new state value.
- `emit`: A function that calls all the listener functions with the current state value.
- `settle`: A function that sets a new state value and then calls all the listener functions.
- `listen`: A function that adds a new listener function.
- `extend`: A function that allows you to add custom behaviors to the state. These will be available in the `props` object.
- `props`: An object containing any extended properties.

## `createMetalState`

`createMetalState` is the function you use to create a new MetalState instance.

### Usage

```tsx
import { createMetalState } from "@metalstate/core"

const myState = createMetalState(initialValue)
```

Where initialValue can be any type, including a function that returns a value.

## `useMetalState`

`useMetalState` is a hook that connects a React component to a MetalState instance. It provides the current state value and a setter function with the props of the state.

### Usage

```tsx
import { useMetalState } from "@metalstate/core"

function MyComponent() {
  const [value, setValue, props] = useMetalState(myState)

  // Use `value` and `setValue` and `props` in your component
}
```

In this case, props will contain any properties or methods you've added to the state instance using extend. So, for example, if you've added an increment method as shown above, you can call props.increment() to increment the state value.

`useMetalState` gives you direct access to extended properties or methods right inside your component.

# MetalState Instance Methods

Each MetalState instance has several methods you can use to interact with the state.

## `get`

Returns the current state value.

### Usage:

```tsx
const currentValue = myState.get()
```

## `set`

Updates the current state value. Does not trigger any listeners.

### Usage:

```tsx
myState.set(newValue)
```

## `settle`

Updates the current state value and triggers all listeners.

### Usage:

```tsx
myState.settle(newValue)
```

## `listen`

Adds a listener function that will be called whenever the state is settled.

### Usage:

```tsx
myState.listen((newValue) => {
  console.log("The new value is", newValue)
})
```

## `extend`

Adds new properties or methods inside the props of the state instance.

### Usage

```tsx
myState.extend({
  increment: function () {
    this.settle(this.get() + 1)
  },
})
```

Then you can use the new method like this:

```tsx
myState.increment()
```
