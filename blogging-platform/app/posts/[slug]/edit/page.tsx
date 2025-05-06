"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import ImagePicker from "@/components/posts/image-picker";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [form, setForm] = useState({
    title: "",
    creator: "",
    description: "",
    image: "",
    content: "",
  });
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
      );
      const data = await res.json();
      setForm(data);
    };
    fetchPost();
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      },
    );
    if (res.ok) {
      router.push(`/posts/${slug}`);
    } else {
      alert("Failed to update post");
    }
  };

  return (
    <>
      <header className={classes.header}>
        <h1>Edit Post</h1>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <p>
            <label htmlFor="title">Title</label>
            <input name="title" value={form.title} onChange={handleChange} />
          </p>

          <p>
            <label htmlFor="creator">Creator</label>
            <input
              name="creator"
              value={form.creator}
              onChange={handleChange}
            />
          </p>

          <p>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </p>

          <p>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              rows={10}
              value={form.content}
              onChange={handleChange}
            />
          </p>
          <ImagePicker
            label="Image"
            name="image"
            value={form.image}
            onImagePick={(imageData) =>
              setForm((prevForm) => ({ ...prevForm, image: imageData }))
            }
          />

          <p className={classes.actions}>
            <button type="submit">Update</button>
          </p>
        </form>
      </main>
    </>
  );
}
