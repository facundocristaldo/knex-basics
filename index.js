require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const app = express();
const knex = require("./db/knex");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todos", (req, res) => {
  // knex.raw("select * from todos").then(function (result) {
  //   return res.send(result[0]);
  // });
  knex
    .select()
    .from("todos")
    .where("completed", false)
    .then((result) => res.send(result));
});

app.post("/todos", (req, res) => {
  knex("todos")
    .insert(req.body)
    .then((id) => {
      // return created row
      knex
        .select()
        .from("todos")
        .whereIn("id", id)
        .then((result) => res.send(result));
    });
});

app.put("/todos/:id", (req, res) => {
  knex("todos")
    .where("id", req.params.id)
    .update({ title: req.body.title, completed: req.body.completed })
    .then(() => {
      // return created row
      knex
        .select()
        .from("todos")
        .where("id", req.params.id)
        .then((result) => res.send(result));
    });
});

app.delete("/todos/:id", (req, res) => {
  knex("todos")
    .where("id", req.params.id)
    .delete()
    .then(() => res.send(200));
});

app.get("/users/:id", (req, res) => {
  knex("users")
    .select()
    .where("users.id", req.params.id)
    .innerJoin("todos", "users.id", "todos.user_id")
    .then((result) => res.send(result));
});

app.listen(port, function () {
  console.log("Listening on port:", port);
});
