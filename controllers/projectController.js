const Project = require("../models/Project");

// GET /projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// POST /projects
const addProject = async (req, res) => {
  const { title, description, tech } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    const project = new Project({ title, description, tech });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not save project", error: err.message });
  }
};

// DELETE /projects/:id
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// UPDATE /projects/:id
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tech } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, {
      title,
      description,
      tech,
    });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { getProjects, addProject, deleteProject, updateProject };
