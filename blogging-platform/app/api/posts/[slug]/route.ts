import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  await connectToDatabase();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const data = await req.json();
  await connectToDatabase();
  const result = await Post.updateOne({ slug: params.slug }, { $set: data });

  if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Post not found or no changes made" },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: "Post updated successfully" });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  await connectToDatabase();
  const result = await Post.deleteOne({ slug: params.slug });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deleted successfully" });
}
