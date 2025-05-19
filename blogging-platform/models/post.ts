import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  date: String,
  creator:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  description: String,
  image: String,
  content: String,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
