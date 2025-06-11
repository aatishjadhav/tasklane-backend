const Teams = require("../models/teams.models");

const getTeams = async (req, res) => {
  try {
    const getTeams = await Teams.find().populate("members", "name");
    if (getTeams) {
      res.status(200).json(getTeams);
    } else {
      res.status(400).json({ message: "Failed to fetch teams" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const addTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    const memberIds = [];

    for (const memberName of members) {
      let user = await Members.findOne({ name: memberName });

      if (!user) {
        user = await Members.create({ name: memberName });
      }

      memberIds.push(user._id);
    }

    const newTeam = await Teams.create({
      name,
      members: memberIds,
    });

    // Populate the members with their names
    const populatedTeam = await Teams.findById(newTeam._id).populate(
      "members",
      "name"
    );

    res.status(201).json(populatedTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
};

const updateTeam = async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataToUpdate = req.body;
    const updatedTeam = await Teams.findByIdAndUpdate(taskId, dataToUpdate, {
      new: true,
    });
    if (updatedTeam) {
      res
        .status(200)
        .json({ message: "Team updated successfully", team: updatedTeam });
    } else {
      res.status(404).json({ message: "Failed to update team" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTeam = await Teams.findByIdAndDelete(taskId);
    if (deletedTeam) {
      res
        .status(200)
        .json({ message: "Team deleted successfully", team: deletedTeam });
    } else {
      res.status(404).json({ error: `team not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getTeams, addTeam, updateTeam, deleteTeam };
