const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/date.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let newTodos = [];
let workTodo = [];
app.get("/", (req, res) => {
  let currentDay = day.getDate();
  res.render("index", { listTitle: currentDay, newItem: newTodos });
});

app.post("/", (req, res) => {
  let newTodo = req.body.newItem;
  if (req.body.listType === "Work List") {
    workTodo.push(newTodo);
    res.redirect("/work");
  } else {
    newTodos.push(newTodo);
    res.redirect("/");
  }
});
app.get("/work", (req, res) => {
  res.render("index", { listTitle: "Work List", newItem: workTodo });
});
app.post("/work", (req, res) => {
  let newTodo = req.body.newItem;
  workTodo.push(newTodo);
  res.redirect("/work");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port 8080");
});
