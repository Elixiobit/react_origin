export const createStore = (initialState, reducer) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState

  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    listeners.forEach((listener) => listener())

    return action
  }

  const subscribe = (listener) => listeners.push(listener)

  return { getState, dispatch, subscribe }
}

/// test

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      }
    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}

const store = createStore({ count: 0 }, reducer)
