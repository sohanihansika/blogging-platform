import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDatabase();
  const post = await Post.create(body);
  return NextResponse.json(post);
}

export async function GET(_req: Request) {
  await connectToDatabase();
  const posts = await Post.find({}, "-content").sort({ date: 1 });
  return NextResponse.json(posts);
}
