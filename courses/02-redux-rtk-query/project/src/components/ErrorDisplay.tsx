/** Stub: Complete Challenge 12 (Error and Loading UX) per README. */

interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
}


export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  
  let message = 'Something went wrong.'

  if (
    error &&
    typeof error === 'object' &&
    'error' in error &&
    typeof (error as { error?: unknown }).error === 'string'
  ) {
    message = (error as { error: string }).error
  }

  return (

     <div id="error-display"><p>{message}</p>

      {onRetry && (
        <button
          data-testid="retry-btn"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  )
}
