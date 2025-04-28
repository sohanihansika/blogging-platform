import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDatabase();
  const post = await Post.create(body);
  return NextResponse.json(post);
}

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get("creator");

  let filter: any = {};
  if (creator) {
    filter.creator = creator;
  }

  const posts = await Post.find(filter, "-content").sort({ date: 1 });
  return NextResponse.json(posts);
}
