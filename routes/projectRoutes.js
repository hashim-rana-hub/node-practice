const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

// GET all projects
router.get("/", getProjects);

// POST a new project
router.post("/", addProject);

//delete a project
router.delete("/:id", deleteProject);

//update a project
router.patch("/:id", updateProject);

module.exports = router;
