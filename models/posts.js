import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: Number,
    content: String,
    title: String,
    image: String,
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        content: String,
        likes: Number,
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Blogs = model("blogs", BlogSchema);
module.exports = Blogs;
