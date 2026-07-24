/** Stub: Complete Challenge 11 (API and Local State) per README. */
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSortBy } from '../store/slices/filtersSlice'
import { useGetPostsQuery } from '../api/apiSlice'


export default function PostsWithFilters() {
   const dispatch = useAppDispatch()

  const { sortBy } = useAppSelector((state) => state.filters)

  const { data: posts = [], isLoading } = useGetPostsQuery()

  const sortedPosts = [...posts].sort((a: any, b: any) =>
    sortBy === 'newest'
      ? b.id - a.id
      : a.id - b.id
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <button onClick={() => dispatch(setSortBy('newest'))}>
          Newest
        </button>

        <button onClick={() => dispatch(setSortBy('oldest'))}>
          Oldest
        </button>
      </div>

      {sortedPosts.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}