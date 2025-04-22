'use client'

import { useRouter } from "next/navigation";
import { FaTrash, FaEdit } from "react-icons/fa";
import classes from "./postActions.module.css";


export default function PostActions( { slug}: { slug: string}){
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Failed to delete post");
            } else {
                alert("Post deleted");
                router.push("/posts");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = () => {
        router.push(`/posts/${slug}/edit`);
      };

        return (
            <div className={classes.actions}>
                <FaEdit onClick={handleEdit} className={classes.icon1} title="Edit Post" />
                <FaTrash onClick={handleDelete} className={classes.icon2} title="Delete Post" />
                
            </div>
        );
}