import PostGrid from "@/components/posts/post-grid";
import { getPostsList } from "@/lib/posts";
import Link from "next/link";
import classes from "./page.module.css";
import { Suspense } from "react";

export const metadata = {
    title: 'All Posts',
  };

async function Posts() {
    const posts = await getPostsList();
    return <PostGrid posts={posts}/>;
}

export default function PostsPage() {

    return (
        <>
        <header className={classes.header}>
            <h1>
                Share blog posts , created {' '}
                <span className={classes.highlight}>by you</span> 
            </h1>
            <p className={classes.cta}>
                <Link href="/posts/share">
                    Share yours
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
                <Posts />
            </Suspense>
                
        </main>
        </>
    );


//     const posts =  getPostsList();

//     return(
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
//             {posts.length === 0 ? (
//                 <p>No posts available.</p>
//             ) : (
//                 <ul>
//                 {posts.map((post) => (
//                     <li key={post.slug} className="mb-2">
//                     <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
//                         {post.title}
//                     </Link>
//                     </li>
//                 ))}
//                 </ul>
//             )}
//         </div>
//   );
}