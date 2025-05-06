"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostGrid from "@/components/posts/post-grid";
import Link from "next/link";
import classes from "./page.module.css";

// export const metadata = {
//   title: "All Posts",
// }

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const creator = searchParams.get("creator");

  useEffect(() => {
    async function fetchPosts() {
      const query = creator ? `?creator=${encodeURIComponent(creator)}` : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${query}`,
        {
          cache: "no-store",
        },
      );
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [creator]);

  return (
    <>
      <header className={classes.header}>
        <h1>
          {creator ? (
            <>
              Explore Blog Posts{" "}
              <span className={classes.highlight}>by {creator}</span>
            </>
          ) : (
            <>
              Share blog posts, created{" "}
              <span className={classes.highlight}>by you</span>
            </>
          )}
        </h1>
        <p className={classes.cta}>
          {creator ? (
            // <Link href="/posts">Show All Posts</Link>
            ""
          ) : (
            <Link href="/posts/share">Share yours</Link>
          )}
        </p>
      </header>

      <main className={classes.main}>
        {loading ? (
          <p className={classes.loading}>Loading...</p>
        ) : posts.length === 0 ? (
          <p className={classes.loading}>No posts found</p>
        ) : (
          <PostGrid posts={posts} />
        )}
      </main>
    </>
  );
}
