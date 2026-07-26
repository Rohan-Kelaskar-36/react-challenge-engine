import Link from "next/link";
import Counter from "./components/Counter";
import Image from "next/image";




export default function Home() {
  return (
    <main>
      <Image
  src="https://placehold.co/300x200"
  alt="Placeholder image"
  width={300}
  height={200}
/>
      <h1>Home</h1>

      <Link href="/about">About</Link>
      <br />
      <Link href="/posts">Posts</Link>

      <Counter />
    </main>
  );
}