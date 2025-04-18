"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import ImagePicker from "@/components/posts/image-picker";

export default function CreatePostPage() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    creator: "",
    description: "",
    image: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      slug:
        name === "title"
          ? value.toLowerCase().replace(/\s+/g, "-")
          : prevForm.slug,
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/posts");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>blog post</span>
        </h1>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="title">Title</label>
            <input name="title" onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor="creator">Creator</label>
            <input name="creator" onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor="description">Description</label>
            <input name="description" onChange={handleChange} required />
          </p>

          <p>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              rows={10}
              onChange={handleChange}
              required
            />
          </p>
          <ImagePicker
            label="Image"
            name="image"
            onImagePick={(imageData) =>
              setForm((prevForm) => ({ ...prevForm, image: imageData }))
            }
          />

          <p className={classes.actions}>
            <button type="submit">Post</button>
          </p>
        </form>
      </main>
    </>
  );
}
