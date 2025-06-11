const Tasks = require("../models/tasks.models");

const getAllTasks = async (req, res) => {
  try {
    const getTaks = await Tasks.find()
      .populate("owners", "name")
      .populate("team", "name");
    if (getTaks) {
      res.status(200).json(getTaks);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const addNewTask = async (req, res) => {
  try {
    const { name, project, team, owners, tags, timeToComplete, status } =
      req.body;
    const addTasks = new Tasks({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    });
    await addTasks.save();
    if (addTasks) {
      res
        .status(201)
        .json({ message: "New Task Created successfully", task: addTasks });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataToUpdate = req.body;
    const updatedTasks = await Tasks.findByIdAndUpdate(taskId, dataToUpdate, {
      new: true,
    });
    if (updatedTasks) {
      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTasks });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Tasks.findByIdAndDelete(taskId);
    if (deletedTask) {
      res
        .status(200)
        .json({ message: "Task deleted successfully", task: deletedTask });
    } else {
      res.status(404).json({ error: `task not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getAllTasks, addNewTask, updateTask, deleteTask };
