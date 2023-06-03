# Getting Started with MetalState

This guide will walk you through the steps needed to install and start using MetalState in your React project.

## Installation

Install MetalState using yarn:

```bash
yarn add metalstate
```

Or with npm:

```bash
npm install metalstate
```

## Setting up a State

Once you've installed `MetalState`, you can import it and use it to set up a state. Here's an example:

Firstly, create your state using the `createMetalState` function:

```tsx
import { createMetalState } from "metalstate"

// Create a simple state with an initial value of 0
const counterState = createMetalState(0)
```

This creates a new state with an initial value of 0.

# Using the State in a Component

Then, use the `useMetalState` hook in your components to interact with the state:

```tsx
import { useMetalState } from "metalstate"

function Counter() {
  // Use the state in your component
  const [count, setCount] = useMetalState(countState)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter
```

In the `Counter` component, we use the `countState` we created earlier. The `useMetalState` hook returns the current state value and a function to update the state, similar to the `useState` hook in React.

Now, whenever you click the "Increment" button, the state is updated and the component re-renders with the new count.

This is a basic example, but `MetalState` is flexible and powerful, allowing you to manage complex state easily. Check out the other guides to learn more about the capabilities of `MetalState`!
