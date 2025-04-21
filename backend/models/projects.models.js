const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  description: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"],
    // Enum for task status
    default: "To Do",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
