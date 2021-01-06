const express = require("express");
const router = express.Router();
const Todo = require("./../models/Todo");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ToDo App" });
});

/* Create a New Todo */
router.post("/create-todo", async (req, res) => {
  const { name } = req.body;
  try {
    const todo = await Todo.create({
      name,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      data: todo,
      message: "New Todo Created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }
});

/* GET all Todos */
router.get("/all-todos", async (req, res) => {
  try {
    const { status } = req.query;

    let todos = [];
    if (status == "all") {
      todos = await Todo.find({});
    } else if (status == "completed") {
      todos = await Todo.find({ status: "completed" });
    } else if (status == "active") {
      todos = await Todo.find({ status: "active" });
    } else {
      todos = await Todo.find({});
    }

    return res.status(200).json({
      success: true,
      status: 200,
      tab: status,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }
});

/* change todo Status */
router.post("/change-status", async (req, res) => {
  const { id, status } = req.body;
  //First Find The TODO.
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: true,
        status: 404,
        error: `No Todo Found Again Id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }

  //Now Update The Status Given By User
  try {
    await Todo.findByIdAndUpdate(id, {
      status: status,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Status Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }
});

/* Delete Todo */
router.post("/delete-todo", async (req, res) => {
  const { id } = req.body;
  //First Find The TODO.
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: true,
        status: 404,
        error: `No Todo Found Again Id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }

  //Now Delte The Given
  try {
    await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }
});

/* Clear Completed */
router.post("/clear-completed", async (req, res) => {
  try {
    await Todo.deleteMany({
      status: "completed",
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Completed Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: "Server Error",
    });
  }
});
module.exports = router;
