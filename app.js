const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const Blog = require("./models/blog");

//Express app
const app = express();

//Connection to MongoDB
const dbURI =
  "mongodb+srv://marcel:test1234@cluster0.he6qebu.mongodb.net/node-app?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const currentYear = new Date().getFullYear();

app.get("/", (req, res) => {
  const random = _.random(1, 12);

  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      //console.log(result[0].createdAt);
      res.render("index", {
        title: "Home",
        blogs: result,
        currentYear,
        random,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
