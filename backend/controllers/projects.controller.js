const Project = require("../models/projects.models");
const Tasks = require("../models/tasks.models");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().lean();

    for (let project of projects) {
      const tasks = await Tasks.find({ project: project._id })
        .select("name status team owners tags timeToComplete createdAt")
        .populate("team", "name")
        .populate("owners", "name email")
        .lean();

      project.tasks = tasks;
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const addNewProject = new Project({ name, description, status });
    await addNewProject.save();
    if (addNewProject) {
      res
        .status(201)
        .json({ message: "New Project created", project: addNewProject });
    } else {
      res.status(400).json({ message: "Failed to add new project" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const dataToUpdate = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      dataToUpdate,
      { new: true }
    );
    if (updatedProject) {
      res.status(200).json({
        message: "project updated successfully",
        project: updatedProject,
      });
    } else {
      res.status(404).json({ message: "project not found with this Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) {
      res.status(200).json({
        message: "project deleted successfully",
        project: deletedProject,
      });
    } else {
      res.status(404).json({ error: `project not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getProjects, addProject, updateProject, deleteProject };
