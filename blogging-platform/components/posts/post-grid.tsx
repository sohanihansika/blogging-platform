import classes from "./post-grid.module.css";
import PostItem from "./post-item";

interface Post {
    title: string;
    slug: string;
    image: string;
    date: string;
    description: string;
}

export default function PostGrid({ posts }: { posts: Post[] }) {
    return (
        <ul className={classes.posts}>
            {posts.map((post) => (
                <li key={post.slug}>
                    <PostItem {...post} />
                </li>
            ))}
        </ul>
    )
}