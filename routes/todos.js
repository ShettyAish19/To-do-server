const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
router.post("/", async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  const savedTodo = await newTodo.save();
  res.status(201).json(savedTodo);
});

// Toggle complete
router.patch("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});
module.exports = router;
