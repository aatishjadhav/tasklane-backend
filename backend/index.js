const { initializeDatabase } = require("./db/db.connect");

initializeDatabase();
const express = require("express");

const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth.route");
const memberRoutes = require("./routes/members.route");
const projectRoutes = require("./routes/projects.route");
const taskRoutes = require("./routes/tasks.route");
const teamRoutes = require("./routes/teams.route");
const userRoutes = require("./routes/users.route");

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
