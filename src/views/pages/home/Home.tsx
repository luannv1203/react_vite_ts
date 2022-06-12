import { useReducer, useState } from 'react';

interface TypeAction {
  type: String
}
const initialState = {count: 0}
function reducer(state: any, action: TypeAction) {
  switch (action.type) {
    case 'INCREMENT':
      state = {...state, ...{count: state.count + 1}}
      break
    case 'DECREMENT':
      state = {...state, ...{count: state.count - 1}}
      break
    default:
      throw new Error();
  }

  return state
}

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      This is home page
      <div>{state.count}</div>
      <button onClick={() => dispatch({type: 'DECREMENT'})}>-</button>
      <button onClick={() => dispatch({type: 'INCREMENT'})}>+</button>
    </div>
  );
}

export default HomePage
