import { getPost } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import NotFound from "../not-found";
import Image from "next/image";

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
            <Image src={`/images/posts/${post.image}`} alt={post.title} width={200} height={200}/>
            <article className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
            </div>
  );
}