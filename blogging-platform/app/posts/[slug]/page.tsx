import { getPost } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import NotFound from "../not-found";

export default async function PostPage({ params }: {params: { slug: string}}){
    const post = getPost(params.slug);
    if(!post){
        return <NotFound />;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
            <p className="text-gray-700">{post.description}</p>
            <img src={`/images/posts/${post.image}`} alt={post.title} className="w-full h-auto my-4" />
            <article className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
            </div>
  );
}