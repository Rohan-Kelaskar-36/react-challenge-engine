import { NextResponse } from "next/server";
type Post = {
  id: number;
  title: string;
};

const posts: Post[]=[
    {id:1,title:"react"},
    {id:2,title:"node,js"}
]

export async function GET(){
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body: Post = await request.json();

  return NextResponse.json(
    {
      message: "Post received",
      post: body,
    },
    { status: 201 }
  );
}