const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

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

app.get("/", (req, res) => {
  const random = _.random(1, 50);
  const currentYear = new Date().getFullYear();
  const blogs = [
    {
      title: "First blog",
      snippet:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Assumenda, provident!",
    },
    {
      title: "Second blog",
      snippet:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Assumenda, provident!",
    },
    {
      title: "Third blog",
      snippet:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Assumenda, provident!",
    },
  ];

  res.render("index", { title: "Home", blogs, currentYear, random });
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
