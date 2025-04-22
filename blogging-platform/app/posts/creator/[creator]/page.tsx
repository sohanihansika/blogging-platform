import PostGrid from "@/components/posts/post-grid";
import classes from "./page.module.css";

export const generateMetadata = ({params,}: {params: { creator: string }}) => ({
  title: `Posts by ${decodeURIComponent(params.creator)}`,
});

async function CreatorPosts({ params }: { params: { creator: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const posts: {
    creator: string;
    title: string;
    slug: string;
    image: string;
    date: string;
    description: string;
  }[] = await res.json();
  const creatorName = decodeURIComponent(params.creator);
  const creatorPosts = posts
    .filter((post) => post.creator === creatorName)
    .map((post) => ({
      ...post,
      title: post.title || "Untitled",
      slug: post.slug || "unknown-slug",
      image: post.image || "/default-image.jpg",
      date: post.date || new Date().toISOString(),
      description: post.description || "No description available",
    }));

  return <PostGrid posts={creatorPosts} />;
}

export default async function CreatorPostsPage({params,}: {params: { creator: string }}) {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Explore Blog Posts{" "}
          <span className={classes.highlight}>
            by {decodeURIComponent(params.creator)}
          </span>
        </h1>
      </header>
      <main className={classes.main}>
        <CreatorPosts
          params={{
            creator: params.creator,
          }}
        />
      </main>
    </>
  );
}
