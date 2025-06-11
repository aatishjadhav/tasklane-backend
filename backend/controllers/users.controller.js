const Users = require("../models/users.models");

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await Users.find();
    if (getAllUsers) {
      return res.status(200).json(getAllUsers);
    } else {
      return res.status(400).json({ message: "Failed to fetch users" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const addNewUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const addNewUser = new Users({ name, email });
    await addNewUser.save();
    if (addNewUser) {
      res.status(201).json({ message: "User created", user: addNewUser });
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToUpdate = req.body;
    const updatedUser = await Users.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (deletedUser) {
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ error: `user not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getUsers, addNewUser, updateUser, deleteUser };
