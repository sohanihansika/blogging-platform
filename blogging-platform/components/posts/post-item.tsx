import Image from "next/image";
import classes from "./post-item.module.css";
import Link from "next/link";

interface PostItemProps {
    title: string;
    slug: string;
    image: string;
    date: string;
    description: string;
    
}

export default function PostItem({ title, slug, image, date, description }: PostItemProps) {
    return (
        <article className={classes.post}>
            <header>
                <div className={classes.image}>
                    <Image src={`/images/posts/${image}`} alt={title} fill/>   
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>{date}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{description}</p>
                <div className={classes.actions}>
                    <Link href={`/posts/${slug}`}>View details</Link>
                </div>
            </div>
        </article>
    )
}