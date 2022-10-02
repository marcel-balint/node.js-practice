const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const blogController = require("./controllers/blogController");

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

app.get("/", blogController.blog_index);
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
