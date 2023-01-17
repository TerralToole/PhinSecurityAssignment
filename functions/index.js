require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { getTodos, addTodo, deleteTodo, updateTodo } = require("./crud.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/api", (req, res) => {
  getTodos().then((todos) => {
    res.send(todos);
  });
});

app.post("/api/addTodo", async (req, res) => {
  console.dir(req.body, { depth: null });
  await addTodo(req.body)
    .then(
      () => res.redirect("/"),
      () => res.redirect("/")
    )
    .catch((error) => {
      console.error(error);
    });
});

app.delete("/api/todo/:id", (req, res) => {
  deleteTodo(req.params.id).then(
    (results) => res.send(results),
  );
});

app.put("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  console.log(`id: `, id);
  console.log(`req body`, req.body);
  updateTodo(id, req.body).then(
    (results) => res.send(results),
  );
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("server started");
});
