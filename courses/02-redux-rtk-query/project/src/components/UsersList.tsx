/** Stub: Complete Challenge 07 (Queries) per README. */

import { useGetUsersQuery } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

export default function UsersList() {
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery()

  if (isLoading) {
    return <div data-testid="users-loading">Loading...</div>
  }

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />
  }

  return (
    <div data-testid="users-list">
      
        {data?.map((user:any) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        ))}
    </div>
  )
}
