'use server';

import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  const title = formData.get('title')?.toString() ?? '';

  // Simulate adding a post
  const post = {
    id: Date.now(),
    title,
  };

  revalidatePath('/posts');

  return post;
}