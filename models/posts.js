const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    favorites: { type: [String], default: [] },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        favorites: { type: [String], default: [] },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Blogs = model("blogs", BlogSchema);
module.exports = Blogs;
