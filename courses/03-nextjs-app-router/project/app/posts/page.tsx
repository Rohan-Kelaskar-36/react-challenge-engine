import type { Metadata } from "next";
import AddPostForm from "../components/AddPostForm";
import Link from "next/link";
import PostsList from "./PostsList";


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const metadata: Metadata = {
  title: "Posts",
  description: "Browse the latest posts.",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    page?: string;
  };
})  {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const query = searchParams.q?.toLowerCase() || "";
const currentPage = Number(searchParams.page || "1");
const postsPerPage = 10;

  const posts: Post[] = await response.json();
const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(query)
);

const startIndex = (currentPage - 1) * postsPerPage;
const paginatedPosts = filteredPosts.slice(
  startIndex,
  startIndex + postsPerPage
);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }



  return (
    <main>
      <h1>Posts</h1>

      <AddPostForm />

      <ul>
        {paginatedPosts.map((post) => (
  <li key={post.id}>{post.title}</li>
))}
      </ul>


      <div>
  {currentPage > 1 && (
    <Link href={`/posts?page=${currentPage - 1}&q=${query}`}>
      Previous
    </Link>
  )}

  {" | "}

  <Link href={`/posts?page=${currentPage + 1}&q=${query}`}>
    Next
  </Link>
</div>

<PostsList/>
    </main>
  );
}