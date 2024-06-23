const express = require('express');
const router = express.Router();

// Models 
const User = require("../Model/usermodel.js");
const Blog = require("../Model/blogmodel.js");
const Comment = require("../Model/comment.js");

// user login In  
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          message: 'success',
          user: {
            name: user.name,
            email: user.email
          }
        });
      } else {
        res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "No record Registered" });
    }
  });
});

// user Register
router.post("/register", (req, res) => {
  User.create(req.body)
    .then((userdata) => res.json(userdata))
    .catch((err) => res.json(err));
});

// user publish blog
router.post('/new', async (req, res) => {
  const { title, imageUrl, content,author } = req.body;
  try {
      const newBlog = new Blog({ title, imageUrl, content, author });
      await newBlog.save();
      res.status(201).json("success");
  } catch (error) {
      res.status(500).json({ message: "Error creating blog post", error });
  }
});

// To fetch blog
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts", error });
  }
});

// Define a route to fetch a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog post", error });
  }
});

// To save comments to the database
router.post('/blogs/:id/comments', async (req, res) => {
  const { comment, author } = req.body;
  const { id: blogId } = req.params;
  try {
    const comm = new Comment({ blogId, comment, author });
    await comm.save();
    res.status(201).json("success");
  } catch (error) {
    res.status(500).json({ message: "Error saving comment", error });
  }
});

// To fetch the comments
router.get('/blogs/:id/comments', async (req, res) => {
  const { id: blogId } = req.params;
  try {
    const comments = await Comment.find({ blogId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

// To get profile (user) data 
router.get('/profile', async (req,res) => {
  const {user} = req.query;
  try {
    const data = await User.findOne({name : user})
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
})

// To get history of user 
router.get('/history', async (req,res) => {
  const {user} = req.query;
  try {
    const data = await Blog.find({author : user})
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
})

// To delete Blog
router.delete('/delete', async (req, res) => {
  const { title } = req.body;
  try {
    const deletedBlog = await Blog.findOneAndDelete({ title });
    if (deletedBlog) {
      res.status(200).json({ message: 'Blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});

// Fetch blog data by title
router.get('/blog', async (req, res) => {
  const { title } = req.query;
  try {
    const blog = await Blog.findOne({ title });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog data', error });
  }
});

// Update blog
router.post('/update', async (req, res) => {
  const { previousTitle, title, content } = req.body;
  try {
    const updateData = { title, content };
    await Blog.findOneAndUpdate({ title: previousTitle }, updateData);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
});

module.exports = router; 
