const express = require("express");
const router = express.Router();
const Blogs = require("../models/posts");
const auth = require("../middleware/auth");
const Users = require("../models/users");
require("dotenv").config();

// Get all blog posts
router.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 20;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Blogs.countDocuments({});
    const allpost = await Blogs.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    await Blogs.populate(allpost, { path: "author", model: "user" });

    if (!allpost) {
      return res.status(400).json({ msg: "No blog posts" });
    }

    res.status(200).json({
      allpost: allpost,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

// Get at least 3 posts
router.get("/limit/3", async (req, res) => {
  try {
    const allpost = await Blogs.find().limit(3).populate({
      path: "author",
      model: "user",
    });
    if (!allpost) {
      return res.status(400).json({ msg: "No blog posts" });
    }

    res.status(200).json(allpost);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

// Get at least 6 posts
router.get("/limit/6", async (req, res) => {
  try {
    const allpost = await Blogs.find().limit(6).populate({
      path: "author",
      model: "user",
    });
    if (!allpost) {
      return res.status(400).json({ msg: "No blog posts" });
    }

    res.status(200).json(allpost);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

// Get all blog posts by category
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const { page } = req.query;
  try {
    //const blogid = await Blogs.findById({ _id });

    if (!category) {
      return res.status(400).json({ msg: "Invalid URL" });
    }

    const limit = 20;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Blogs.countDocuments({});
    //const allpost = await Blogs.find().sort({_id: -1}).limit(limit).skip(startIndex)
    const allpost = await Blogs.aggregate([
      {
        $match: {
          category: category,
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    await Blogs.populate(allpost, { path: "author", model: "user" });

    if (!allpost) {
      return res.status(400).json({ msg: "No blog posts" });
    }

    res.status(200).json({
      allpost: allpost,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

// Get blog post by id
router.get("/:category/:id/:slug", async (req, res) => {
  const { category, id, slug } = req.params;

  try {
    if (!slug || !id || !category) {
      return res.status(400).json({ msg: "Invalid slug or id" });
    }
    const postid = await Blogs.findById(id).populate({
      path: "author",
      model: "user",
    });

    if (!postid) {
      return res.status(400).json({ msg: `Blog post ${id} does not exist` });
    }

    res.status(200).json(postid);
  } catch (error) {
    res.status(400).json({ msg: "Internal server error", error });
  }
});

// Get all my blog posts
router.get("/myposts", async (req, res) => {
  try {
    const user = await Users.findById({ _id: req.user.id });
    const allpost = await Blogs.findOne({ author: user._id });

    console.log("user", user);
    console.log("post", allpost);
    if (!allpost) {
      return res.status(400).json({ msg: "No blog posts" });
    }

    res.status(200).json({ msg: "Success", allpost });
  } catch (error) {
    res.status(400).json({ msg: "Just lost", error });
  }
});

//Post blog
router.post("/myposts", auth, async (req, res) => {
  const { content, title, category, image, comments, favorites } = req.body;

  if (!content || !title || !category) {
    return res.status(400).json({ msg: "Please fill in everything" });
  }

  try {
    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ msg: "Please sign up to create blog" });
    }

    let words = title.split(" ").filter((w) => w !== "");
    let createSlug = words.join("-");

    const createBlog = new Blogs({
      content,
      title,
      category,
      image,
      author: user,
      comments,
      favorites,
      slug: createSlug,
    });
    await createBlog.save();
    res.status(200).json({ msg: "Blog post successfuly created", createBlog });
  } catch (error) {
    return res.status(400).json({ msg: "Just lost", error });
  }
});

// Update blog
router.put("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ msg: "Please sign up " });
    }
    const finduser = await Blogs.findOne({ author: user._id });

    if (!finduser) {
      return res.status(400).json({ msg: "You don't own this blog post" });
    }
    const findBlog = await Blogs.findById(id);

    if (!findBlog) {
      return res.status(400).json({ msg: `Blog post ${id} does not exist` });
    }

    const updateBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      updateBlog,
      msg: `Blog post ${id} has been successfully updated`,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

// Delete blog
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ msg: "Please sign up " });
    }
    const finduser = await Blogs.findOne({ author: user._id });

    if (!finduser) {
      return res.status(400).json({ msg: "You don't own this blog post" });
    }
    const findBlog = await Blogs.findById(req.params.id);

    if (!findBlog) {
      return res
        .status(400)
        .json({ msg: `Blog post ${req.params.id} does not exist` });
    }

    await findBlog.remove();

    res.status(200).json({
      id: req.params.id,
      msg: `Blog post ${req.params.id} was successfully deleted`,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//Like blog
router.patch("/favorites/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ msg: "Invalid id" });
    }

    const likeblog = await Blogs.findById(id);

    const index = likeblog.favorites.findIndex(
      (id) => id === String(req.userId)
    );

    if (index === -1) {
      likeblog.favorites.push(req.userId);
    } else {
      likeblog.favorites = likeblog.favorites.filter(
        (id) => id !== String(req.userId)
      );
    }

    const updateBlog = await Blogs.findByIdAndUpdate(id, likeblog, {
      new: true,
    });
    res.status(200).json(updateBlog);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//Comment blog
router.post("/comment/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const user = await Users.findById(req.user.id);
    const commentblog = await Blogs.findById(id);
    await commentblog.comments.push(content, user);
    const commentedblog = await Blogs.findByIdAndUpdate(id, commentblog, {
      new: true,
    });
    res.status(200).json(commentedblog);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});
module.exports = router;
