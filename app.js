const express = require("express");
const { create } = require("lodash");

//Express app
const app = express();

//Listen for requests
app.listen(3000);
//Register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
