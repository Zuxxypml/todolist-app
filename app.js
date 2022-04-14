// Requiring dependencies and Creating Variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// MongoDB
// Start of mongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB");
// Schema and models
const ItemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", ItemsSchema);
const code = new Item({
  name: "Code something new.",
});
const eat = new Item({
  name: "Eat",
});
const brush = new Item({
  name: "Brush my teeth",
});
const defaultTodo = [brush, eat, code];
// Work Items Schema
const WorkSchema = new mongoose.Schema({
  name: String,
});
const Work = mongoose.model("Work", WorkSchema);

// Item.insertMany(defaultTodo, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Saved to DB.");
//   }
// });

// end of MongoDB
// Requests
// Get requests
app.get("/", (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      if (items.length === 0) {
        Item.insertMany(defaultTodo, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully Saved to DB.");
          }
          res.redirect("/");
        });
      } else {
        res.render("index", {
          listTitle: " Today ",
          newItem: items,
        });
      }
    }
  });
});
app.get("/work", (req, res) => {
  Work.find({}, (err, works) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { listTitle: "Work List", newItem: works });
    }
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
// Post requests
app.post("/", (req, res) => {
  let newTodo = req.body.newItem;
  if (req.body.listType === "Work List") {
    const newItem = new Work({
      name: newTodo,
    });
    Work.insertMany([newItem], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added new item to Work DB");
      }
    });
    res.redirect("/work");
  } else {
    const newItem = new Item({
      name: newTodo,
    });
    Item.insertMany([newItem], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added new item");
      }
    });
    res.redirect("/");
  }
});

app.post("/work", (req, res) => {
  let newTodo = req.body.newItem;
  const newItem = new Work({
    name: newTodo,
  });
  Work.insertMany([newItem], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added new item to Work DB");
    }
  });
  res.redirect("/work");
});

// Listener
app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port 8080");
});
