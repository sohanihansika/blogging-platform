import Link from "next/link";

import classes from "./page.module.css";
import ImageSlideshow from "../components/images/images_slidshow";

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>Blogging Platform for Bloggers</h1>
            <p>Share your thoughts and ideas with the world.</p>
          </div>
          <div className={classes.cta}>
            {/* <Link href="/community" >Join the Community</Link> */}
            <Link href="/posts">Explore Posts</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>What is Blogify?</h2>
          <p>
            Blogify is a modern blogging platform designed for passionate
            writers, storytellers, and thought leaders. Whether you're sharing
            insights, documenting experiences, or inspiring readers, Blogify
            provides the perfect space to express yourself.
          </p>
          <p>
            With a clean and user-friendly interface, Blogify helps you create,
            manage, and showcase your blogs effortlessly. Connect with
            like-minded individuals and be part of a thriving community.
          </p>
        </section>

        {/* <section className={classes.section}>
          <h2>Why Choose Blogify?</h2>
          <ul>
            <li>
              <strong>Effortless Writing:</strong> Create and publish content
              seamlessly with our Markdown-powered editor.
            </li>
            <li>
              <strong>Engage with Readers:</strong> Enable comments and
              interactions to build a strong community.
            </li>
            <li>
              <strong>Customizable Themes:</strong> Personalize your blog with
              themes that suit your style.
            </li>
            <li>
              <strong>Mobile-Friendly:</strong> Write and read on the go with a
              fully responsive design.
            </li>
          </ul>
        </section> */}
      </main>
    </>
  );
}
