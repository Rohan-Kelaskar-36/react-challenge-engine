// import { notFound } from "next/navigation";

// type Post = {
//   id: number;
//   title: string;
//   body: string;
// };

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// export default async function PostDetailsPage({ params }: PageProps) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params.id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     notFound();
//   }

//   const post: Post = await response.json();

//   if (!post || !post.id) {
//     notFound();
//   }

//   return (
//     <main>
//       <h1>{post.title}</h1>

//       <p>{post.body}</p>

//       <p>Post ID: {params.id}</p>
//     </main>
//   );
// }

// export async function generateStaticParams() {
//   return [
//     { id: "1" },
//     { id: "2" },
//     { id: "3" },
//   ];
// }

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LikeButton from "../../components/LikeButton";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  return {
    title: `Post ${params.id}`,
    description: `Details for post ${params.id}`,
  };
}

export default async function PostPage({ params }: Props) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  if (!response.ok) {
    notFound();
  }

  const post: Post = await response.json();

  if (!post.id) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>

      <p>{post.body}</p>

      <LikeButton />
    </main>
  );
}