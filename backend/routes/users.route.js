const express = require("express");
const router = express.Router();
const {
  getUsers,
  addNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", getUsers);
router.post("/", verifyToken, addNewUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
