import { getPost } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import NotFound from "../not-found";
import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

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
  const post = await getPost(params.slug);
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
            by <a href={`/posts/creator/${encodeURIComponent(post.creator)}`}>{post.creator}</a>
          </p>
          <p className={classes.date}>{post.date}</p>
          {/* <p className={classes.description}>{post.description}</p> */}
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
