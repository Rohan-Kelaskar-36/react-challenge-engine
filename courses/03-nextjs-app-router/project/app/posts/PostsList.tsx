"use client";

import { useGetPostsQuery } from "../store/apiSlice";

export default function PostsList() {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading posts.</p>;

  return (
    <ul>
      {data?.slice(0, 10).map((post) => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}