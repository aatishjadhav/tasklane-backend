const Members = require("../models/members.models");

const getMembers = async (req, res) => {
  try {
    const getAllUsers = await Members.find();
    if (getAllUsers) {
      return res.status(200).json(getAllUsers);
    } else {
      return res.status(400).json({ message: "Failed to fetch users" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getMembers };
