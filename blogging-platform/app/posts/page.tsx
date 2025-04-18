import PostGrid from "@/components/posts/post-grid";
import { getPostsList } from "@/lib/posts";
import Link from "next/link";
import classes from "./page.module.css";
import { Suspense } from "react";

export const metadata = {
  title: "All Posts",
};

async function Posts() {
  const posts = await getPostsList();
  const resolvedPosts = await Promise.all(posts);

  const sortedPosts = resolvedPosts.sort((a, b) => (a.date > b.date ? 1 : -1));
  return <PostGrid posts={sortedPosts} />;
}

export default function PostsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share blog posts , created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p className={classes.cta}>
          <Link href="/posts/share">Share yours</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <Posts />
        </Suspense>
      </main>
    </>
  );
}
