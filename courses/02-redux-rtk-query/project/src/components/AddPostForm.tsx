import { FormEvent, useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'


/** Stub: Complete Challenge 09 (Mutations) per README. */
export default function AddPostForm() {
   const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [addPost, { isLoading, isSuccess }] = useAddPostMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await addPost({
      title,
      body,
    })

    setTitle('')
    setBody('')
  }

  return (
    <form
      data-testid="add-post-form"
      onSubmit={handleSubmit}
    >
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>

      {isSuccess && <p>Post added successfully!</p>}
    </form>
  )
}