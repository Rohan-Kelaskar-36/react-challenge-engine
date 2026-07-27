// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../store/store";
// import { increment } from "../store/counterSlice";

// export default function Counter() {
//   const count = useSelector(
//     (state: RootState) => state.counter.value
//   );

//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h2>Count: {count}</h2>

//       <button onClick={() => dispatch(increment())}>
//         Increment
//       </button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}