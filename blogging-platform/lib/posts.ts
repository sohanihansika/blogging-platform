import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPostsList() {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames.map(async (fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(".md", ""),
      title: data.title || "Untitled",
      date: data.date || "Unknown Date",
      creator: data.creator || "Unknown Creator",
      description: data.description || "No description available",
      image: data.image || "No image available",
    };
  });
}

export async function getPost(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  // if (!fs.existsSync(filePath)) {
  //   return null;
  // }
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return {
    content,
    title: data.title || "Untitled",
    date: data.date || "Unknown Date",
    creator: data.creator || "Unknown Creator",
    description: data.description || "No description available",
    image: data.image || "No image available",
  };
}
