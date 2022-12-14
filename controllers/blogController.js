const _ = require("lodash");
const Blog = require("../models/blog");

const currentYear = new Date().getFullYear();

const blog_edit = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render("edit", {
      blog: result,
      currentYear,
      title: "Edit",
      page: "edit",
    });
  });
};

const blog_index = (req, res) => {
  const random = _.random(1, 12);

  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Home",
        page: "home",
        blogs: result,
        currentYear,
        random,
      });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    console.log(result.createdAt.getFullYear());
    res.render("details", {
      blog: result,
      currentYear,
      title: "Blog Details",
      page: "details",
    });
  });
};

const blog_create_get = (req, res) => {
  res.render("create", {
    title: "Create a new Blog",
    page: "create",
    currentYear,
  });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit,
};
