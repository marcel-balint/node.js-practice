const express = require("express");
const { create } = require("lodash");

//Express app
const app = express();

//Listen for requests
app.listen(3000);
//Register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
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

  res.render("index", { title: "Home", blogs });
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
