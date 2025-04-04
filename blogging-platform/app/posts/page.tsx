import { getPostsList } from "@/lib/posts";
import Link from "next/link";

export default function PostsPage() {
    const posts =  getPostsList();

    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                {posts.map((post) => (
                    <li key={post.slug} className="mb-2">
                    <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
                        {post.title}
                    </Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
  );
}