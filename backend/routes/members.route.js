const express = require("express");
const router = express.Router();
const { getMembers } = require("../controllers/members.controller");

router.get("/", getMembers);

module.exports = router;
