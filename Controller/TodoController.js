const express = require("express");
const todoSchema = require("../Models/TodoSchema");

const getAllTodo = async (req, res) => {
  try {
    const todos = await todoSchema.find().sort({ updatedAt: -1 });
    if (!todos) return res.status(400).json({ message: "No Items " });
    return res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoSchema.findById({ _id: id });
    if (!todo) return res.status(404).json({ message: "No item found" });
    return res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const addNewTodo = async (req, res) => {
  const { title, text } = req.body;
  if (!text || !title) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const newTodo = await todoSchema.create({
      title: title,
      body: text,
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const editTodo = async (req, res) => {
  const { id } = req.params;
  const { newTitle, newText } = req.body;

  try {
    if (!newTitle || !newText) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const todo = await todoSchema.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "No item found" });
    }

    todo.title = newTitle;
    todo.body = newText;
    await todo.save();
    return res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is required" });
  try {
    const deletedTodo = await todoSchema.findByIdAndDelete({ _id: id });
    if (!deletedTodo) return res.status(404).json({ message: "No item found" });
    return res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

module.exports = {
  getAllTodo,
  getTodo,
  addNewTodo,
  editTodo,
  deleteTodo,
};
