import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostsList(){
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data} = matter(fileContents);

    return{
      slug: fileName.replace(".md", ""),
      title: data.title || "Untitled",
      date: data.date || "Unknown Date",
      description: data.description || "No description available",
      image: data.image || "No image available",
    };
  });
}

export function getPost(slug: string){
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if(!fs.existsSync(filePath)){
    return null;
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return{
    content,
    title: data.title || "Untitled",
    date: data.date || "Unknown Date",
    description: data.description || "No description available",
    image: data.image || "No image available",
  };

}