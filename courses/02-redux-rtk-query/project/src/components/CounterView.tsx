/** Stub: Complete Challenge 03 (Reading and Dispatching) per README. */


import { increment,decrement } from "../store/slices/counterSlice"
import { useAppDispatch,useAppSelector } from "../store/hooks"

export default function CounterView() {
    const counter = useAppSelector((state) => state.counter)
    const dispatch = useAppDispatch()

  return  ( <div id="counter-view">
      <h3>Counter</h3>

      <p data-testid="counter-value">{counter}</p>

      <button
        data-testid="increment-btn"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>

      <button
        data-testid="decrement-btn"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
    )
}
