// 'use client';

// type ErrorProps = {
//   error: Error;
//   reset: () => void;
// };

// export default function Error({ error, reset }: ErrorProps) {
//   return (
//     <main>
//       <h1>Something went wrong!</h1>

//       <p>{error.message}</p>

//       <button onClick={() => reset()}>
//         Try Again
//       </button>
//     </main>
//   );
// }

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
   <div>
      <h2>Something went wrong!</h2>

      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}