const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", getAllTasks);
router.post("/", verifyToken, addNewTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

module.exports = router;
