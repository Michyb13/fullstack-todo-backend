const express = require("express");
const router = express.Router();
const {
  addNewTodo,
  editTodo,
  getTodo,
  getAllTodo,
  deleteTodo,
} = require("../Controller/TodoController");

router.route("/").get(getAllTodo).post(addNewTodo);
router.route("/:id").get(getTodo).put(editTodo).delete(deleteTodo);

module.exports = router;
