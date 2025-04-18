import { getPostsList } from "@/lib/posts";
import PostGrid from "@/components/posts/post-grid";
import classes from "./page.module.css";

export const generateMetadata = ({
  params,
}: {
  params: { creator: string };
}) => ({
  title: `Posts by ${decodeURIComponent(params.creator)}`,
});

async function CreatorPosts({ params }: { params: { creator: string } }) {
  const posts = await getPostsList();
  const resolvedPosts = await Promise.all(posts);
  const creatorName = decodeURIComponent(params.creator);
  const creatorPosts = resolvedPosts.filter(
    (post) => post.creator === creatorName
  );

  const sortedPosts = creatorPosts.sort((a, b) => (a.date > b.date ? 1 : -1));
  return <PostGrid posts={sortedPosts} />;
}

export default async function CreatorPostsPage({
  params,
}: {
  params: { creator: string };
}) {
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
