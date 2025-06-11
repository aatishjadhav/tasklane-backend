const express = require("express");
const router = express.Router();
const {
  getTeams,
  addTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teams.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", getTeams);
router.post("/", verifyToken, addTeam);
router.put("/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

module.exports = router;
