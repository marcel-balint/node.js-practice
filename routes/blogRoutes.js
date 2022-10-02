const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render("details", { blog: result, title: "Blog Details" });
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/" }))
    .catch((err) => console.log(err));
});

module.exports = router;
