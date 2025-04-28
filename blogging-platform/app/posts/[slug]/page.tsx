// import { getPost } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import NotFound from "../not-found";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
import PostActions from "./post-actions";

async function fetchPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);
  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={post.image} alt={post.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{post.title}</h1>
          <p className={classes.creator}>
            by{" "}
            <a href={`/posts?creator=${encodeURIComponent(post.creator)}`}>
              {post.creator}
            </a>
          </p>
          <p className={classes.date}>{post.date}</p>
          <PostActions slug={post.slug} />
        </div>
      </header>
      <main>
        <article className={classes.content}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
