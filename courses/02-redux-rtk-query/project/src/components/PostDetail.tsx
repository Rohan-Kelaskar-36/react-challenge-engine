/** Stub: Complete Challenge 13 (Query with Parameters) per README. */
import { useGetPostByIdQuery } from '../api/apiSlice'

interface PostDetailProps {
  postId?: number
}


export default function PostDetail(
  { postId }: PostDetailProps
) {

const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId as number, {
    skip: !postId,
  })

  if (isLoading) {
    return (
      <div id="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    return (
      <div id="post-detail-error">
        Failed to load post.
      </div>
    )
  }
  return (
    <div id="post-detail">Failed to load post.
     <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  )
}
