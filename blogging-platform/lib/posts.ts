// import fs from "fs/promises";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "content/posts");

// export async function getPostsList() {
//   const fileNames = await fs.readdir(postsDirectory);

//   return fileNames.map(async (fileName) => {
//     const filePath = path.join(postsDirectory, fileName);
//     const fileContents = await fs.readFile(filePath, "utf-8");
//     const { data } = matter(fileContents);

//     return {
//       slug: fileName.replace(".md", ""),
//       title: data.title || "Untitled",
//       date: data.date || "Unknown Date",
//       creator: data.creator || "Unknown Creator",
//       description: data.description || "No description available",
//       image: data.image || "No image available",
//     };
//   });
// }

// export async function getPost(slug: string) {
//   const filePath = path.join(postsDirectory, `${slug}.md`);
//   // if (!fs.existsSync(filePath)) {
//   //   return null;
//   // }
//   const fileContent = await fs.readFile(filePath, "utf-8");
//   const { content, data } = matter(fileContent);

//   return {
//     content,
//     title: data.title || "Untitled",
//     date: data.date || "Unknown Date",
//     creator: data.creator || "Unknown Creator",
//     description: data.description || "No description available",
//     image: data.image || "No image available",
//   };
// }


import { connectToDatabase } from "./mongodb";
import Post from "../models/post";

export async function getPostsList() {
  await connectToDatabase();
  const posts = await Post.find({}, "-content").sort({ date: 1 });

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    creator: post.creator,
    description: post.description,
    image: post.image,
  }));
}

export async function getPost(slug: string) {
  await connectToDatabase();
  const post = await Post.findOne({ slug });

  if( !post) {
    return null;
  }

  return {
    content: post.content,
    slug: post.slug,
    title: post.title,
    date: post.date,
    creator: post.creator,
    description: post.description,
    image: post.image,    
  }
}