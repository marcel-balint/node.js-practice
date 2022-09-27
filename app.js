const express = require("express");

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

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
