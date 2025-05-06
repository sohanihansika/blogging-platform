// import { connectToDatabase } from "./mongodb";
// import Post from "../models/post";

// export async function getPostsList() {
//   await connectToDatabase();
//   const posts = await Post.find({}, "-content").sort({ date: 1 });

//   return posts.map((post) => ({
//     slug: post.slug,
//     title: post.title,
//     date: post.date,
//     creator: post.creator,
//     description: post.description,
//     image: post.image,
//   }));
// }

// export async function getPost(slug: string) {
//   await connectToDatabase();
//   const post = await Post.findOne({ slug });

//   if( !post) {
//     return null;
//   }

//   return {
//     content: post.content,
//     slug: post.slug,
//     title: post.title,
//     date: post.date,
//     creator: post.creator,
//     description: post.description,
//     image: post.image,
//   }
// }
