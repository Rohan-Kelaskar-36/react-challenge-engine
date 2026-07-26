'use client';

import { addPost } from '../actions';

export default function AddPostForm() {
  return (
    <form action={addPost}>
      <input
        type="text"
        name="title"
        placeholder="Enter post title"
        required
      />

      <button type="submit">
        Add Post
      </button>
    </form>
  );
}