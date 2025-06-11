const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", getProjects);
router.post("/", verifyToken, addProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;
