const Project = require("../models/Project");
const { projectValidator } = require("../validators/validator");
const cloudinary = require("../config/cloudinary");

// GET /projects
const getProjects = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const total = await Project.countDocuments();
    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching projects",
      error: err.message,
    });
  }
};

// POST /projects
const addProject = async (req, res) => {
  const { title, description, tech } = req.body;
  const { isValid, errors } = projectValidator(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    const image = req.file?.path || null;
    const project = new Project({ title, description, tech, image });
    const saved = await project.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not save project",
      error: err.message,
    });
  }
};

// DELETE /projects/:id
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting project",
      error: err.message,
    });
  }
};

// PUT /projects/:id
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tech } = req.body;
  const { isValid, errors } = projectValidator(req.body);

  if (!title && !description && !tech && !req.file) {
    return res.status(400).json({
      success: false,
      message: "Nothing provided to update",
    });
  }
  try {
    const updatedProject = await Project.findById(id);

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Upload new image if provided
    if (req.file) {
      const oldImagePublicId = updatedProject.image
        ?.split("/")
        .pop()
        .split(".")[0];
      await cloudinary.uploader.destroy(`uploads/${oldImagePublicId}`);

      updatedProject.image = req.file.path; // Cloudinary URL
    }

    // Update other fields
    if (title !== undefined) updatedProject.title = title;
    if (description !== undefined) updatedProject.description = description;
    if (tech !== undefined) updatedProject.tech = tech;

    const updated = await updatedProject.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while updating project",
      error: err.message,
    });
  }
};

module.exports = { getProjects, addProject, deleteProject, updateProject };
