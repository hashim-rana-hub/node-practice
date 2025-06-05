const express = require("express");
const router = express.Router();
const {
  uploadFile,
  uploadMultipleFiles,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authmiddleware");
const parser = require("../middleware/cloudinaryMiddleWare");

// Single file
router.post("/upload", authMiddleware, parser.single("file"), uploadFile);

// Multiple files
router.post(
  "/upload/multi",
  authMiddleware,
  parser.array("files", 5),
  uploadMultipleFiles
);

module.exports = router;
